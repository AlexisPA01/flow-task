import { db } from "../../config/database.js";

await db.query("SELECT 1");

export const findByEmail = async (email) => {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

export const findAll = async () => {
    const result = await db.query("SELECT id, email FROM users");

    return result.rows;
};