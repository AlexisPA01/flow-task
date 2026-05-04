import request from "supertest";
import app from "../../app.js";
import { db } from "../../config/database.js";
import { env } from "../../config/env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { afterEach, beforeEach } from "vitest";

let userId;
let accessToken;
let userTokenId;
let organizationId;

const deleteUserAfter = () => {
    afterEach(async () => {
        await db.query("delete from users where id = $1", [userId]);
    });
};

const deleteUser = () => {
    beforeEach(async () => {
        await db.query("delete from users where id = $1", [userId]);

        const passwordHash = await bcrypt.hash("12345678", 10);
        const user = await db.query(
            `insert into users (email, password_hash)
                values ($1, $2)
                returning id`,
            ["testvitest@test.com", passwordHash]
        );

        userId = user.rows[0].id;
    });
};

describe("Users API", () => {
    beforeAll(async () => {
        const passwordHash = await bcrypt.hash("12345678", 10);
        const userRes = await db.query(
            "insert into users (email, password_hash) values ($1, $2) returning id",
            ["testuser@test.com", passwordHash]
        );

        userTokenId = userRes.rows[0].id;

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
            ["Test Organization User", generateSlug("Test Organization User"), userTokenId]
        );

        organizationId = organizationRes.rows[0].id;

        accessToken = jwt.sign(
            {
                userId: userTokenId,
                organizationId: organizationId
            },
            env.secretJWT
        );
    });

    // =========================
    // POST /api/users
    // =========================
    describe("POST /api/users", () => {
        deleteUserAfter();

        it("should create a user", async () => {
            const res = await request(app)
                .post("/api/users")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    email: "testvitest@test.com",
                    password: "12345678"
                });

            userId = res.body.data.id;

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User created successfully");
            expect(res.body.data.email).toBe("testvitest@test.com");
        });

        it("should fail with invalid data (Zod)", async () => {
            const res = await request(app)
                .post("/api/users")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    email: "testvitest@test.com",
                    password: "1234567"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    // =========================
    // GET /api/users
    // =========================
    describe("GET /api/users", () => {
        it("should return users", async () => {
            deleteUser();

            const res = await request(app).get("/api/users").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Users obtained successfully");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // =========================
    // GET /api/users/by-id/:id
    // =========================
    describe("GET /api/users/by-id/:id", () => {
        deleteUser();

        it("should return a user", async () => {
            const res = await request(app).get(`/api/users/by-id/${userId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User obtained successfully");
            expect(res.body.data.id).toBe(userId);
        });

        it("should fail with invalid id format", async () => {
            const res = await request(app).get("/api/users/by-id/invalid-id").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid params");
        });
    });

    // =========================
    // GET /api/users/by-email/:email
    // =========================
    describe("GET /api/users/by-email/:email", () => {
        deleteUser();

        it("should return a user", async () => {
            const res = await request(app).get(`/api/users/by-id/${userId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User obtained successfully");
            expect(res.body.data.id).toBe(userId);
        });

        it("should fail with invalid email format", async () => {
            const res = await request(app).get("/api/users/by-email/invalid-email").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid params");
        });
    });

    // =========================
    // PUT /api/users/by-id/:id
    // =========================
    describe("PUT /api/users/by-id/:id", () => {
        deleteUser();

        it("should update a user", async () => {
            const res = await request(app)
                .put(`/api/users/by-id/${userId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    avatarUrl: "https://static.vecteezy.com/system/resources/previews/003/719/475/non_2x/happy-emoji-face-free-vector.jpg"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User updated successfully");
            expect(res.body.data.avatar_url).toBe("https://static.vecteezy.com/system/resources/previews/003/719/475/non_2x/happy-emoji-face-free-vector.jpg");
        });

        it("should fail with invalid body", async () => {
            const res = await request(app)
                .put(`/api/users/by-id/${userId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    avatarUrl: "No avatar URL"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    // =========================
    // PUT /api/userschange-password/:id
    // =========================
    describe("PUT /api/users/change-password/:id", () => {
        deleteUser();

        it("should update a user's password", async () => {
            const res = await request(app)
                .put(`/api/users/change-password/${userId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    password: "87654321"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User password updated successfully");
        });

        it("should fail with invalid body", async () => {
            const res = await request(app)
                .put(`/api/users/change-password/${userId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    password: "7654321"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    // =========================
    // POST /api/users/log-in
    // =========================
    describe("POST /api/users/log-in", () => {
        deleteUser();

        it("should log in the user", async () => {
            const res = await request(app)
                .post("/api/users/log-in")
                .send({
                    email: "testvitest@test.com",
                    password: "12345678"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("User logged-in successfully");
            expect(res.body.data).toHaveProperty("accessToken");
            expect(res.body.data).toHaveProperty("refreshToken");
        });

        it("should not log in the user", async () => {
            const res = await request(app)
                .post("/api/users/log-in")
                .send({
                    email: "testvitest@test.com",
                    password: "12345679"
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Email or password wrong");
        });
    });

    afterAll(async () => {
        await db.query("delete from organizations where id = $1", [organizationId]);
        await db.query("delete from users where id = $1", [userTokenId]);
        await db.query("delete from users where id = $1", [userId]);
    });
});