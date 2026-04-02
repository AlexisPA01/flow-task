import { db } from "../../config/database.js";

export const getPriorities = async () => {
    const result = await db.query("select id, name from priority");

    return result.rows;
};

export const createPriority = async ({ name }) => {
    const result = await db.query(
        `insert into priority (name)
     values ($1)
     returning id, name`,
        [name]
    );

    return result.rows[0];
};

export const getPriorityById = async (id) => {
    const result = await db.query(`select id, name from priority where id = $1`, [id]);

    return result.rows[0];
};