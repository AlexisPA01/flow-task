import { db } from "../../config/database.js";

const selectQuery = `select 
        n.id, 
        n.title,
        n.message,
        n.is_read,
        m.created_at,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as user,
        json_build_object(
            'id', nt.id, 
            'name', nt.name
        ) as notification_type
    from notification n
    inner join users u on n.user_id = u.id
    inner join notification_type nt on n.type_id = nt.id`

export const getNotifications = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createNotification = async ({ title, message, userId, typeId }) => {
    const result = await db.query(
        `insert into notification (title, message, user_id, type_id)
     values ($1, $2, $3, $4)
     returning title, message, is_read, user_id, type_id, created_at`,
        [title, message, userId, typeId]
    );

    return result.rows[0];
};

export const updateNotificationStatus = async (id) => {
    const result = await db.query(
        `update notification set is_read = true where id = $1
        returning title, message, is_read, user_id, type_id, created_at`,
        [id]
    );

    return result.rows[0];
};

export const getNotificationById = async (id) => {
    const result = await db.query(`${selectQuery} where n.id = $1`, [id]);

    return result.rows[0];
};

export const getNotificationsByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where n.user_id = $1`, [userId]);

    return result.rows;
};

export const getNotificationsByTypeId = async (typeId) => {
    const result = await db.query(`${selectQuery} where n.type_id = $1`, [typeId]);

    return result.rows;
};