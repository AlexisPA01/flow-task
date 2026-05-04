import request from "supertest";
import app from "../../app.js";
import { db } from "../../config/database.js";
import { env } from "../../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let userId;
let organizationId;
let organizationSelfId;
let accessToken;

const generateSlug = (name) => {
    return name ? name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        : undefined;
}

const deleteOrganization = () => {
    beforeEach(async () => {
        await db.query("delete from organizations where id = $1", [organizationId]);

        const res = await db.query(
            "insert into organizations (name, slug, owner_id) values ($1, $2, $3) returning id",
            ["Test Organization Vitest", generateSlug("Test Organization Vitest"), userId]
        );

        organizationId = res.rows[0].id;
    });
};

describe("Organizations API", () => {
    beforeAll(async () => {
        const passwordHash = await bcrypt.hash("12345678", 10);
        const userRes = await db.query(
            "insert into users (email, password_hash) values ($1, $2) returning id",
            ["testorganization@test.com", passwordHash]
        );

        userId = userRes.rows[0].id;

        const organizationRes = await db.query(
            "insert into organizations (name, slug, owner_id) values ($1, $2, $3) returning id",
            ["Test Organization Self", generateSlug("Test Organization Self"), userId]
        );

        organizationSelfId = organizationRes.rows[0].id;

        accessToken = jwt.sign(
            {
                userId: userId,
                organizationId: organizationSelfId
            },
            env.secretJWT
        );
    });

    // =========================
    // POST /api/organizations
    // =========================
    describe("POST /api/organizations", () => {
        it("should create a organization", async () => {
            const res = await request(app)
                .post("/api/organizations")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Organization Vitest",
                    ownerId: userId
                });

            organizationId = res.body.data.id;

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Organization created successfully");
            expect(res.body.data.name).toBe("Test Organization Vitest");
        });

        it("should fail with invalid data (Zod)", async () => {
            const res = await request(app)
                .post("/api/organizations")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Organization Vitest",
                    ownerId: "1234"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid data");
        });

        it("should fail if user does not exist (service/validator)", async () => {
            const res = await request(app)
                .post("/api/organizations")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Organization Vitest",
                    ownerId: "00000000-0000-0000-0000-000000000000"
                });

            expect([400, 404]).toContain(res.statusCode);
            expect(res.body.success).toBe(false);
        });
    });

    // =========================
    // GET /api/organizations
    // =========================
    describe("GET /api/organizations", () => {
        it("should return organizations", async () => {
            deleteOrganization();

            const res = await request(app).get("/api/organizations").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Organizations obtained successfully");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // =========================
    // GET /api/organizations/by-id/:id
    // =========================
    describe("GET /api/organizations/by-id/:id", () => {
        deleteOrganization();

        it("should return a organization", async () => {
            const res = await request(app).get(`/api/organizations/by-id/${organizationId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Organization obtained successfully");
            expect(res.body.data.id).toBe(organizationId);
        });

        it("should fail with invalid id format", async () => {
            const res = await request(app).get("/api/organizations/by-id/invalid-id").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid params");
        });
    });

    // =========================
    // PUT /api/organizations/by-id/:id
    // =========================
    describe("PUT /api/organizations/by-id/:id", () => {
        deleteOrganization();

        it("should update a organization", async () => {
            const res = await request(app)
                .put(`/api/organizations/by-id/${organizationId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Updated Organization"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Organization updated successfully");
            expect(res.body.data.name).toBe("Updated Organization");
        });

        it("should fail with invalid body", async () => {
            const res = await request(app)
                .put(`/api/organizations/by-id/${organizationId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    nameNOT: "Name 1 test changed"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    afterAll(async () => {
        await db.query("delete from organizations where id = $1", [organizationId]);
        await db.query("delete from organizations where id = $1", [organizationSelfId]);
        await db.query("delete from users where id = $1", [userId]);
    });
});