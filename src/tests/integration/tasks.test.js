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
let taskId;

const deleteTask = () => {
    beforeEach(async () => {
        await db.query("delete from tasks where id = $1", [taskId]);

        const res = await db.query(
            `insert into tasks (title, project_id, reporter_id, status_id, priority_id, due_date)
                values ($1, $2, $3, $4, $5, $6)
                returning id`,
            ["Task 1", projectId, userId, 1, 1, "2026-06-01 00:00:00.000"]
        );

        taskId = res.rows[0].id;
    });
};

describe("Tasks API", () => {
    beforeAll(async () => {
        const passwordHash = await bcrypt.hash("12345678", 10);
        const userRes = await db.query(
            "insert into users (email, password_hash) values ($1, $2) returning id",
            ["test@test.com", passwordHash]
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
            ["Test Organization", generateSlug("Test Organization"), userId]
        );

        organizationId = organizationRes.rows[0].id;

        accessToken = jwt.sign(
            {
                userId: userId,
                organizationId: organizationId
            },
            env.secretJWT
        );

        const generateKey = (key) => {
            return key ? key.toUpperCase().trim().replaceAll(" ", "") : undefined;
        };

        const projectRes = await db.query(
            "insert into projects (name, key, description, organization_id, created_by) values ($1, $2, $3, $4, $5) returning id",
            ["Test Project", generateKey("Test Project"), null, organizationId, userId]
        );

        projectId = projectRes.rows[0].id;
    });

    // =========================
    // POST /api/tasks
    // =========================
    describe("POST /api/tasks", () => {
        it("should create a task", async () => {
            const res = await request(app)
                .post("/api/tasks")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    title: "Test Task",
                    projectId,
                    reporterId: userId,
                    priorityId: 1,
                    dueDate: "2026-06-01 00:00:00.000"
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Tasks created successfully");
            expect(res.body.data.title).toBe("Test Task");
        });

        it("should fail with invalid data (Zod)", async () => {
            const res = await request(app)
                .post("/api/tasks")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    title: "Test Task",
                    projectId: "1234",
                    reporterId: "5678",
                    priorityId: 1,
                    dueDate: "2026-06-01 00:00:00.000"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid data");
        });

        it("should fail if project does not exist (service/validator)", async () => {
            const res = await request(app)
                .post("/api/tasks")
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    title: "Test Task",
                    projectId: "00000000-0000-0000-0000-000000000000",
                    reporterId: userId,
                    priorityId: 1,
                    dueDate: "2026-06-01 00:00:00.000"
                });

            expect([400, 404]).toContain(res.statusCode);
            expect(res.body.success).toBe(false);
        });
    });

    // =========================
    // GET /api/tasks
    // =========================
    describe("GET /api/tasks", () => {
        it("should return tasks", async () => {
            const task = await db.query(
                `insert into tasks (title, project_id, reporter_id, status_id, priority_id, due_date) 
                values ($1, $2, $3, $4, $5, $6)
                returning id`,
                ["Task 1", projectId, userId, 1, 1, "2026-06-01 00:00:00.000"]
            );

            taskId = task.rows[0].id;

            const res = await request(app).get("/api/tasks").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Tasks obtained successfully");
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    // =========================
    // GET /api/tasks/by-id/:id
    // =========================
    describe("GET /api/tasks/by-id/:id", () => {
        deleteTask();

        it("should return a task", async () => {
            const res = await request(app).get(`/api/tasks/by-id/${taskId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Task obtained successfully");
            expect(res.body.data.id).toBe(taskId);
        });

        it("should fail with invalid id format", async () => {
            const res = await request(app).get("/api/tasks/by-id/invalid-id").set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error.message).toBe("Invalid params");
        });
    });

    // =========================
    // PUT /api/tasks/by-id/:id
    // =========================
    describe("PUT /api/tasks/by-id/:id", () => {
        deleteTask();

        it("should update a task", async () => {
            const res = await request(app)
                .put(`/api/tasks/by-id/${taskId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    title: "Updated Task"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Tasks updated successfully");
            expect(res.body.data.title).toBe("Updated Task");
        });

        it("should fail with invalid body", async () => {
            const res = await request(app)
                .put(`/api/tasks/by-id/${taskId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    titleNOT: "Title 1 test changed"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error.message).toBe("Invalid data");
        });
    });

    // =========================
    // PUT /api/tasks/status/:id
    // =========================
    describe("PUT /api/tasks/status/:id", () => {
        deleteTask();

        it("should update task status", async () => {
            const res = await request(app)
                .put(`/api/tasks/status/${taskId}`)
                .set("Authorization", `Bearer ${accessToken}`)
                .send({
                    statusId: 1
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Tasks status updated successfully");
        });
    });

    // =========================
    // GET /api/tasks/by-project/:projectId
    // =========================
    describe("GET /api/tasks/by-project/:projectId", () => {
        beforeEach(async () => {
            await db.query("delete from tasks where project_id = $1", [projectId]);
        });
        it("should return empty array if no tasks", async () => {
            const res = await request(app).get(`/api/tasks/by-project/${projectId}`).set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("No tasks found");
            expect(res.body.data).toEqual([]);
        });
    });

    afterAll(async () => {
        await db.query("delete from tasks where project_id = $1", [projectId]);
        await db.query("delete from projects where id = $1", [projectId]);
        await db.query("delete from organizations where id = $1", [organizationId]);
        await db.query("delete from users where id = $1", [userId]);
    });
});