import { db } from "../../config/database.js";

export const getStatus = async () => {
    const result = await db.query("select id, name from status");

    return result.rows;
};

export const createStatus = async ({ name }) => {
    const result = await db.query(
        `insert into status (name)
     values ($1)
     returning id, name`,
        [name]
    );

    return result.rows[0];
};

export const getStatusById = async (id) => {
    const result = await db.query(`select id, name from status where id = $1`, [id]);

    return result.rows[0];
};
