import { db } from "../../config/database.js";

export const getOrganiationMembers = async () => {
    const result = await db.query("select id, organization_id, user_id, role_id, joined_at from organization_members");

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
    const result = await db.query(
        "select id, organization_id, user_id, role_id, joined_at from organization_members where id = $1",
        [id]
    );

    return result.rows;
};

export const getOrganiationMembersByOrganizationId = async (organizationId) => {
    const result = await db.query(
        "select id, organization_id, user_id, role_id, joined_at from organization_members where organization_id = $1",
        [organizationId]
    );

    return result.rows;
};

export const getOrganiationMembersByUserId = async (userId) => {
    const result = await db.query(
        "select id, organization_id, user_id, role_id, joined_at from organization_members where user_id = $1",
        [userId]
    );

    return result.rows;
};