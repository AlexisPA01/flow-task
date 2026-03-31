import { db } from "../../config/database.js";

export const getOrganizations = async () => {
    const result = await db.query("select id, name, slug, owner_id from organizations");

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
        `update organizations set name = COALESCE($1, name), slug = COALESCE($2, slug), owner_id = COALESCE($3, owner_id), updated_at = now()
        where id = $4
        returning id, name, slug, owner_id, created_at, updated_at`,
        [name ?? null, slug ?? null, ownerId ?? null, id]
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