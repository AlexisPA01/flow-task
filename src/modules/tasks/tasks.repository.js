import { db } from "../../config/database.js";

const selectQuery = `select 
        t.id, 
        t.title,
        t.description,
        t.due_date,
        t.created_at,
        t.updated_at,
        json_build_object(
            'id', p.id, 
            'name', p.name, 
            'key', p.key,
            'description', p.description
        ) as project,
        json_build_object(
            'id', ua.id, 
            'email', ua.email
        ) as assigneed,
        json_build_object(
            'id', ur.id, 
            'email', ur.email
        ) as reporter,
        json_build_object(
            'id', s.id, 
            'name', s.name
        ) as status,
        json_build_object(
            'id', pr.id, 
            'name', pr.name
        ) as priority
    from tasks t
    inner join projects p on t.project_id = p.id 
    inner join users ua on t.assignee_id = ua.id
    inner join users ur on t.reporter_id = ur.id
    inner join status s on t.status_id = s.id
    inner join priority pr on t.priority_id = pr.id`

export const getTasks = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createTask = async ({ title, description, projectId, assigneeId, reporterId, priorityId, dueDate }) => {
    const result = await db.query(
        `insert into tasks 
        (title, description, project_id, assignee_id, reporter_id, status_id, priority_id, due_date)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning id, title, description, project_id, assignee_id, reporter_id, status_id, priority_id, due_date, created_at`,
        [title, description || null, projectId, assigneeId || null, reporterId, 1, priorityId, dueDate || null]
    );

    return result.rows[0];
};

export const updateTask = async ({ id, title, description, assigneeId, reporterId, priorityId, dueDate }) => {
    const result = await db.query(
        `update tasks set 
        title = COALESCE($1, title), 
        description = COALESCE($2, description), 
        assignee_id = COALESCE($3, assignee_id), 
        reporter_id = COALESCE($4, reporter_id), 
        priority_id = COALESCE($5, priority_id), 
        due_date = COALESCE($6, due_date), 
        updated_at = now() where id = $7
        returning id, title, description, project_id, assignee_id, reporter_id, status_id, priority_id, due_date, created_at, updated_at`,
        [title || null, description || null, assigneeId || null, reporterId || null, priorityId || null, dueDate || null, id]
    );

    return result.rows[0];
};

export const updateTaskStatus = async ({ id, statusId }) => {
    const result = await db.query(
        `update tasks set status_id = $1, updated_at = now() where id = $2
        returning id, title, description, project_id, assignee_id, reporter_id, status_id, priority_id, due_date, created_at, updated_at`,
        [statusId, id]
    );

    return result.rows[0];
}

export const getTaskById = async (id) => {
    const result = await db.query(`${selectQuery} where t.id = $1`, [id]);

    return result.rows[0];
};

export const getTasksByProjectId = async (projectId) => {
    const result = await db.query(`${selectQuery} where t.project_id = $1`, [projectId]);

    return result.rows;
};

export const getTasksByUserAssigneeId = async (assigneeId) => {
    const result = await db.query(`${selectQuery} where t.assignee_id = $1`, [assigneeId]);

    return result.rows;
};

export const getTasksByUserReporterId = async (reporterId) => {
    const result = await db.query(`${selectQuery} where t.reporter_id = $1`, [reporterId]);

    return result.rows;
};

export const getTasksByStatusId = async (statusId) => {
    const result = await db.query(`${selectQuery} where t.status_id = $1`, [statusId]);

    return result.rows;
};

export const getTasksByPriorityId = async (priorityId) => {
    const result = await db.query(`${selectQuery} where t.priority_id = $1`, [priorityId]);

    return result.rows;
};