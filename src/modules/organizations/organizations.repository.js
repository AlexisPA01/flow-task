import { db } from "../../config/database.js";

const selectQuery = `
    select 
        o.id, 
        o.name,
        o.slug,
        o.created_at,
        o.updated_at,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as owner
    from organizations o
    inner join users u on o.owner_id = u.id
`;

const returningQuery = `
    returning 
        organizations.id, 
        organizations.name,
        organizations.slug,
        organizations.created_at,
        organizations.updated_at,
    (
        select json_build_object(
            'id', u.id, 
            'email', u.email
        )
        from users u
        where u.id = organizations.owner_id
    ) as owner
`;

export const getOrganizations = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createOrganization = async ({ name, slug, ownerId }) => {
    const result = await db.query(
        `insert into organizations (name, slug, owner_id)
        values ($1, $2, $3)
        ${returningQuery}`,
        [name, slug, ownerId]
    );

    return result.rows[0];
};

export const updateOrganization = async ({ id, name, slug, ownerId }) => {
    const result = await db.query(
        `update organizations set name = COALESCE($1, name), slug = COALESCE($2, slug), owner_id = COALESCE($3, owner_id), updated_at = now()
        where id = $4
        ${returningQuery}`,
        [name ?? null, slug ?? null, ownerId ?? null, id]
    );

    return result.rows[0];
};

export const getOrganizationById = async (id) => {
    const result = await db.query(
        `${selectQuery} where o.id = $1`,
        [id]
    );

    return result.rows[0];
};