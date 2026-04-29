import { env } from "../config/env.js";
import { db } from "../config/database.js";
import { afterAll, beforeAll } from "vitest";

let client;

beforeAll(async () => {
    client = await db.connect();
});

afterAll(async () => {
    client.release();
});