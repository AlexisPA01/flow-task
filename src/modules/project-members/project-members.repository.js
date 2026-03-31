import { db } from "../../config/database.js";

const selectQuery = `select 
        pm.id, 
        pm.joined_at,
        json_build_object(
            'id', p.id, 
            'name', p.name, 
            'key', p.key,
            'description', p.description
        ) as project,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as user
    from project_members pm
    inner join projects p on pm.project_id = p.id 
    inner join users u on pm.user_id = u.id`

export const getProjectMembers = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createProjectMembers = async ({ projectId, userId }) => {
    const result = await db.query(
        `insert into project_members (project_id, user_id)
     values ($1, $2)
     returning id, project_id, user_id, joined_at`,
        [projectId, userId]
    );

    return result.rows[0];
};

export const deleteProjectMemberById = async (id) => {
    const result = await db.query(
        `delete from project_members where id = $1`,
        [id]
    );

    return result.rowCount;
};

export const deleteProjectMembersByProjectId = async (projectId) => {
    const result = await db.query(
        `delete from project_members where project_id = $1`,
        [projectId]
    );

    return result.rowCount;
};

export const deleteProjectMembersByUserId = async (userId) => {
    const result = await db.query(
        `delete from project_members where user_id = $1`,
        [userId]
    );

    return result.rowCount;
};

export const getProjectMemberById = async (id) => {
    const result = await db.query(`${selectQuery} where pm.id = $1`, [id]);

    return result.rows[0];
};

export const getProjectMembersByProjectId = async (projectId) => {
    const result = await db.query(`${selectQuery} where pm.project_id = $1`, [projectId]);

    return result.rows;
};

export const getProjectMembersByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where pm.user_id = $1`, [userId]);

    return result.rows;
};