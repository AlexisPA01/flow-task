import request from "supertest";
import app from "../../app.js";
import { db } from "../../config/database.js";
import { env } from "../../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let projectId;
let userId;
let organizationId;
let accessToken;

const generateKey = (key) => {
    return key ? key.toUpperCase().trim().replaceAll(" ", "") : undefined;
};

const deleteProject = () => {
    beforeEach(async () => {
        await db.query("delete from projects where id = $1", [projectId]);

        const res = await db.query(
            "insert into projects (name, key, description, organization_id, created_by) values ($1, $2, $3, $4, $5) returning id",
            ["Test Project Vitest", generateKey("Test Project Vitest"), null, organizationId, userId]
        );

        projectId = res.rows[0].id;
    });
};

describe("Tasks API", () => {
    beforeAll(async () => {
        const passwordHash = await bcrypt.hash("12345678", 10);
        const userRes = await db.query(
            "insert into users (email, password_hash) values ($1, $2) returning id",
            ["testproject@test.com", passwordHash]
        );

        userId = userRes.rows[0].id;

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

        const organizationRes = await db.query(
            "insert into organizations (name, slug, owner_id) values ($1, $2, $3) returning id",
            ["Test Organization Project", generateSlug("Test Organization Project"), userId]
        );

        organizationId = organizationRes.rows[0].id;

        accessToken = jwt.sign(
            {
                userId: userId,
                organizationId: organizationId
            },
            env.secretJWT
        );
    });

    // =========================
    // POST /api/projects
    // =========================
    describe("POST /api/projects", () => {
        it("should create a project", async () => {
            const res = await request(app)
                .post("/api/projects")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Project",
                    key: generateKey("Key Test"),
                    description: "This is a good description for project",
                    organizationId: organizationId,
                    createdBy: userId
                });

            projectId = res.body.data.id;

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Project created successfully");
            expect(res.body.data.name).toBe("Test Project");
        });

        it("should fail with invalid data (Zod)", async () => {
            const res = await request(app)
                .post("/api/projects")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Project",
                    key: generateKey("Key Test Project"),
                    organizationId: organizationId,
                    createdBy: userId
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid data");
        });

        it("should fail if project does not exist (service/validator)", async () => {
            const res = await request(app)
                .post("/api/projects")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Test Project",
                    key: generateKey("Key Test Project"),
                    description: "This is a good description for project",
                    organizationId: "00000000-0000-0000-0000-000000000000",
                    createdBy: userId
                });

            expect([400, 404]).toContain(res.statusCode);
            expect(res.body.success).toBe(false);
        });
    });

    // =========================
    // GET /api/projects
    // =========================
    describe("GET /api/projects", () => {
        it("should return projects", async () => {
            deleteProject();

            const res = await request(app).get("/api/projects").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Projects obtained successfully");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // =========================
    // GET /api/projects/by-id/:id
    // =========================
    describe("GET /api/projects/by-id/:id", () => {
        deleteProject();

        it("should return a project", async () => {
            const res = await request(app).get(`/api/projects/by-id/${projectId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Project obtained successfully");
            expect(res.body.data.id).toBe(projectId);
        });

        it("should fail with invalid id format", async () => {
            const res = await request(app).get("/api/projects/by-id/invalid-id").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid params");
        });
    });

    // =========================
    // PUT /api/projects/by-id/:id
    // =========================
    describe("PUT /api/projects/by-id/:id", () => {
        deleteProject();

        it("should update a project", async () => {
            const res = await request(app)
                .put(`/api/projects/by-id/${projectId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    name: "Updated Project"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Project updated successfully");
            expect(res.body.data.name).toBe("Updated Project");
        });

        it("should fail with invalid body", async () => {
            const res = await request(app)
                .put(`/api/projects/by-id/${projectId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    nameNOT: "Name 1 test changed"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    // =========================
    // GET /api/projects/by-project/:projectId
    // =========================
    describe("GET /api/projects/by-organization/:projectId", () => {
        beforeEach(async () => {
            await db.query("delete from projects where organization_id = $1", [organizationId]);
        });
        it("should return empty array if no organization", async () => {
            const res = await request(app).get(`/api/projects/by-organization/${organizationId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("No projects found");
            expect(res.body.data).toEqual([]);
        });
    });

    // =========================
    // GET /api/projects/by-user/:createdBy
    // =========================
    describe("GET /api/projects/by-user/:createdBy", () => {
        deleteProject();

        it("should return empty array of projects", async () => {
            const res = await request(app).get(`/api/projects/by-user/${userId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Projects obtained successfully");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    afterAll(async () => {
        await db.query("delete from projects where id = $1", [projectId]);
        await db.query("delete from organizations where id = $1", [organizationId]);
        await db.query("delete from users where id = $1", [userId]);
    });
});