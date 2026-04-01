import { db } from "../../config/database.js";

const selectQuery = `select 
        l.id, 
        l.name,
        l.color,
        json_build_object(
            'id', o.id, 
            'name', o.name, 
            'slug', o.slug
        ) as organization
    from labels l
    inner join organizations o on l.organization_id = o.id `

export const getLabels = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createLabel = async ({ name, color, organizationId }) => {
    const result = await db.query(
        `insert into labels (name, color, organization_id)
     values ($1, $2, $3)
     returning id, name color, organization_id`,
        [name, color, organizationId]
    );

    return result.rows[0];
};

export const updateLabel = async ({ id, name, color }) => {
    const result = await db.query(
        `update labels set name = COALESCE($1, name), color = COALESCE($2, color) where id = $3
        returning id, name color, organization_id`,
        [name, color, id]
    );

    return result.rows[0];
};

export const getLabelById = async (id) => {
    const result = await db.query(`${selectQuery} where l.id = $1`, [id]);

    return result.rows[0];
};

export const getLabelsByOrganizationId = async (organizationId) => {
    const result = await db.query(`${selectQuery} where l.organization_id = $1`, [organizationId]);

    return result.rows;
};