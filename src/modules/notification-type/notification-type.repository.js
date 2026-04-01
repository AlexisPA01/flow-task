import { db } from "../../config/database.js";

export const getNotificationTypes = async () => {
    const result = await db.query("select id, name from notification_type");

    return result.rows;
};

export const createNotificationType = async ({ name }) => {
    const result = await db.query(
        `insert into notification_type (name)
     values ($1)
     returning id, name`,
        [name]
    );

    return result.rows[0];
};

export const getNotificationTypeById = async (id) => {
    const result = await db.query(`select id, name from notification_type nt where nt.id = $1`, [id]);

    return result.rows[0];
};
