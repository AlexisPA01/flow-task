import { db } from "../../config/database.js";

const selectQuery = `select 
        om.id, 
        om.joined_at,
        json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        ) as organization,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as user,
        json_build_object(
            'id', r.id, 
            'name', r.name
        ) as role
    from organization_members om
    inner join organizations o on om.organization_id = o.id 
    inner join users u on om.user_id = u.id
    inner join role r on om.role_id = r.id`

export const getOrganiationMembers = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createOrganiationMembers = async ({ organizationId, userId, roleId }) => {
    const result = await db.query(
        `insert into organization_members (organization_id, user_id, role_id)
     values ($1, $2, $3)
     returning id, organization_id, user_id, role_id, joined_at`,
        [organizationId, userId, roleId]
    );

    return result.rows[0];
};

export const deleteOrganiationMemberById = async (id) => {
    const result = await db.query(
        `delete from organization_members where id = $1`,
        [id]
    );

    return result.rowCount;
};

export const deleteOrganiationMembersByOrganizationId = async (organizationId) => {
    const result = await db.query(
        `delete from organization_members where organization_id = $1`,
        [organizationId]
    );

    return result.rowCount;
};

export const deleteOrganiationMembersByUserId = async (userId) => {
    const result = await db.query(
        `delete from organization_members where user_id = $1`,
        [userId]
    );

    return result.rowCount;
};

export const getOrganiationMemberById = async (id) => {
    const result = await db.query(`${selectQuery} where om.id = $1`, [id]);

    return result.rows[0];
};

export const getOrganiationMembersByOrganizationId = async (organizationId) => {
    const result = await db.query(`${selectQuery} where om.organization_id = $1`, [organizationId]);

    return result.rows;
};

export const getOrganiationMembersByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where om.user_id = $1`, [userId]);

    return result.rows;
};