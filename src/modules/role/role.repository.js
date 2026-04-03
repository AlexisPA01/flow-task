import { db } from "../../config/database.js";

export const getRoles = async () => {
    const result = await db.query("select id, name from role");

    return result.rows;
};

export const createRole = async ({ name }) => {
    const result = await db.query(
        `insert into role (name)
     values ($1)
     returning id, name`,
        [name]
    );

    return result.rows[0];
};

export const getRoleById = async (id) => {
    const result = await db.query(`select id, name from role where id = $1`, [id]);

    return result.rows[0];
};