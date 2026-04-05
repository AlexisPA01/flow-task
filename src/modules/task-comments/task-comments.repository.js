import { db } from "../../config/database.js";

const selectQuery = `
    select 
        tc.id, 
        tc.content,
        tc.created_at,
        tc.updated_at,
        json_build_object(
            'id', t.id, 
            'title', t.title, 
            'description', t.description,
            'due_date', t.due_date
        ) as task,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as author
    from task_comments tc
    inner join tasks t on tc.task_id = t.id 
    inner join users u on tc.author_id = u.id`;

const returningQuery = `
    returning 
        task_comments.id, 
        task_comments.content,
        task_comments.created_at,
        task_comments.updated_at,
    (
        select json_build_object(
            'id', t.id,
            'title', t.title,
            'description', t.description,
            'due_date', t.due_date
        )
        from tasks t
        where t.id = task_comments.task_id
    ) as task,
    (
        select json_build_object(
            'id', u.id,
            'email', u.email
        )
        from users u
        where u.id = task_comments.author_id
    ) as author
`;


export const getTaskComments = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createTaskComment = async ({ content, taskId, authorId }) => {
    const result = await db.query(
        `insert into task_comments (content, task_id, author_id)
     values ($1, $2, $3)
     ${returningQuery}`,
        [content, taskId, authorId]
    );

    return result.rows[0];
};

export const updateTaskComment = async ({ id, content, taskId, authorId }) => {
    const result = await db.query(
        `update task_comments set 
        content = COALESCE($1, content), 
        task_id = COALESCE($2, task_id), 
        author_id = COALESCE($3, author_id) 
        where id = $4
        ${returningQuery}`,
        [content || null, taskId || null, authorId || null, id]
    );

    return result.rows[0];
};

export const deleteTaskCommentById = async (id) => {
    const result = await db.query(
        `delete from task_comments where id = $1`,
        [id]
    );

    return result.rowCount;
};

export const getTaskCommentById = async (id) => {
    const result = await db.query(`${selectQuery} where tc.id = $1`, [id]);

    return result.rows[0];
};

export const getTaskCommentsByTaskId = async (taskId) => {
    const result = await db.query(`${selectQuery} where tc.task_id = $1`, [taskId]);

    return result.rows;
};

export const getTaskCommentsByAuthorId = async (authorId) => {
    const result = await db.query(`${selectQuery} where tc.author_id = $1`, [authorId]);

    return result.rows;
};
