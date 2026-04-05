import { db } from "../../config/database.js";

const selectQuery = `select 
        al.id, 
        al.action,
        al.entity_type,
        al.entity_id,
        al.metadata,
        json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        ) as organization,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as creator
    from activity_logs al
    inner join organizations o on al.organization_id = o.id 
    inner join users u on al.user_id = u.id`

export const getActivityLogs = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createActivityLog = async ({ action, entityType, entityId, metadata, organizationId, userId }) => {
    const result = await db.query(
        `insert into activity_logs (action, entity_type, entity_id, metadata, organization_id, user_id)
     values ($1, $2, $3, $4, $5)
     returning id, action, entity_type, entity_id, metadata, organization_id, user_id, created_at`,
        [action, entityType, entityId, metadata, organizationId, userId]
    );

    return result.rows[0];
};

export const getActivityLogById = async (id) => {
    const result = await db.query(`${selectQuery} where al.id = $1`, [id]);

    return result.rows[0];
};

export const getActivityLogsByOrganizationId = async (organizationId) => {
    const result = await db.query(`${selectQuery} where al.organization_id = $1`, [organizationId]);

    return result.rows;
};

export const getActivityLogsByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where al.user_id = $1`, [userId]);

    return result.rows;
};