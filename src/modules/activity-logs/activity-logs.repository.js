import { db } from "../../config/database.js";

const selectQuery = `
    select 
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
    inner join users u on al.user_id = u.id
`;

const returningQuery = `
    returning 
        activity_logs.id, 
        activity_logs.action,
        activity_logs.entity_type,
        activity_logs.entity_id,
        activity_logs.metadata,
    (
        select json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        )
        from organizations o
        where o.id = activity_logs.organization_id
    ) as organization,
    (
        select json_build_object(
            'id', u.id, 
            'email', u.email
        )
        from users u
        where u.id = activity_logs.user_id
    ) as user
`;

export const getActivityLogs = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createActivityLog = async ({ action, entityType, entityId, metadata, organizationId, userId }) => {
    const result = await db.query(
        `insert into activity_logs (action, entity_type, entity_id, metadata, organization_id, user_id)
        values ($1, $2, $3, $4, $5)
        ${returningQuery}`,
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