import { db } from "../../config/database.js";

const selectQuery = `select 
        p.id, 
        p.name,
        p.key,
        p.description,
        json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        ) as organization,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as creator
    from projects p
    inner join organizations o on p.organization_id = o.id 
    inner join users u on p.created_by = u.id`

export const getProjects = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createProject = async ({ name, key, description, organizationId, createdBy }) => {
    const result = await db.query(
        `insert into projects (name, key, description, organization_id, created_by)
     values ($1, $2, $3, $4, $5)
     returning id, name, key, description, organization_id, created_by, created_at`,
        [name, key, description || null, organizationId, createdBy]
    );

    return result.rows[0];
};

export const updateProject = async ({ id, name, key, description }) => {
    const result = await db.query(
        `update projects set name = COALESCE($1, name), key = COALESCE($2, key), description = COALESCE($3, description), updated_at = now() where id = $4
        returning id, name, key, description, updated_at`,
        [name || null, key || null, description || null, id]
    );

    return result.rows[0];
};

export const getProjectById = async (id) => {
    const result = await db.query(`${selectQuery} where p.id = $1`, [id]);

    return result.rows[0];
};

export const getProjectsByOrganizationId = async (organizationId) => {
    const result = await db.query(`${selectQuery} where p.organization_id = $1`, [organizationId]);

    return result.rows;
};

export const getProjectsByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where p.created_by = $1`, [userId]);

    return result.rows;
};