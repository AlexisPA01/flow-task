import { db } from "../../config/database.js";

export const getOrganizations = async () => {
    const result = await db.query("SELECT id, name, slug, owner_id FROM organizations");

    return result.rows;
};

export const createOrganization = async ({ name, slug, ownerId }) => {
    const result = await db.query(
        `insert into organizations (name, slug, owner_id)
     values ($1, $2, $3)
     returning id, name, slug, owner_id, created_at`,
        [name, slug, ownerId]
    );

    return result.rows[0];
};

export const updateOrganization = async ({ id, name, slug, ownerId }) => {
    const result = await db.query(
        `update organizations set name = $1, slug = $2, owner_id = $3, updated_at = now()
        where id = $4
        returning id, name, slug, owner_id, created_at, updated_at`,
        [name, slug, ownerId, id]
    );

    return result.rows[0];
};

export const getOrganizationById = async (id) => {
    const result = await db.query(
        "select * from organizations where id = $1",
        [id]
    );

    return result.rows[0];
};