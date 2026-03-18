import { Pool } from "pg";
import { env } from "./env.js";

export const db = new Pool({
    user: env.user,
    password: env.password,
    host: env.host,
    port: env.port,
    database: env.database,
});

db.on("connect", () => {
    console.log("PostgreSQL connected");
});

db.on("error", (err) => {
    console.error("PostgreSQL error", err);
});