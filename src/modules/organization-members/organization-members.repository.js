import { db } from "../../config/database.js";

const selectQuery = `
    select 
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
    inner join role r on om.role_id = r.id
`;

const returningQuery = `
    returning 
        organization_members.id, 
        organization_members.joined_at,
    (
        select json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        )
        from organizations o
        where o.id = organization_members.organization_id
    ) as organization,
    (
        select json_build_object(
            'id', u.id, 
            'email', u.email
        )
        from users u
        where u.id = organization_members.user_id
    ) as user,
    (
        select json_build_object(
            'id', r.id, 
            'name', r.name
        )
        from role r
        where r.id = organization_members.role_id
    ) as role
`;

export const getOrganizationMembers = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createOrganizationMembers = async ({ organizationId, userId, roleId }) => {
    const result = await db.query(
        `insert into organization_members (organization_id, user_id, role_id)
        values ($1, $2, $3)
        ${returningQuery}`,
        [organizationId, userId, roleId]
    );

    return result.rows[0];
};

export const deleteOrganizationMemberById = async (id) => {
    const result = await db.query(
        `delete from organization_members where id = $1`,
        [id]
    );

    return result.rowCount;
};

export const deleteOrganizationMembersByOrganizationId = async (organizationId) => {
    const result = await db.query(
        `delete from organization_members where organization_id = $1`,
        [organizationId]
    );

    return result.rowCount;
};

export const deleteOrganizationMembersByUserId = async (userId) => {
    const result = await db.query(
        `delete from organization_members where user_id = $1`,
        [userId]
    );

    return result.rowCount;
};

export const getOrganizationMemberById = async (id) => {
    const result = await db.query(`${selectQuery} where om.id = $1`, [id]);

    return result.rows[0];
};

export const getOrganizationMembersByOrganizationId = async (organizationId) => {
    const result = await db.query(`${selectQuery} where om.organization_id = $1`, [organizationId]);

    return result.rows;
};

export const getOrganizationMembersByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where om.user_id = $1`, [userId]);

    return result.rows;
};