import { db } from "../../config/database.js";

const selectQuery = `
    select 
        a.id, 
        a.file_url,
        a.file_name,
        a.created_at,
        json_build_object(
            'id', t.id, 
            'title', t.title, 
            'description', t.description,
            'due_date', t.due_date
        ) as task,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as uploader
    from attachments a
    inner join tasks t on a.task_id = t.id 
    inner join users u on a.uploaded_by = u.id`;

const returningQuery = `
    returning 
        attachments.id, 
        attachments.file_url,
        attachments.file_name,
        attachments.created_at,
    (
        select json_build_object(
            'id', t.id,
            'title', t.title,
            'description', t.description,
            'due_date', t.due_date
        )
        from tasks t
        where t.id = attachments.task_id
    ) as task,
    (
        select json_build_object(
            'id', u.id,
            'email', u.email
        )
        from users u
        where u.id = attachments.uploaded_by
    ) as user
`;


export const getAttachments = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createAttachment = async ({ fileUrl, fileName, taskId, uploaderId }) => {
    const result = await db.query(
        `insert into attachments (file_url, file_name, task_id, uploaded_by)
     values ($1, $2, $3, $4)
     ${returningQuery}`,
        [fileUrl, fileName, taskId, uploaderId]
    );

    return result.rows[0];
};

export const updateAttachment = async ({ id, fileUrl, fileName, taskId, uploaderId }) => {
    const result = await db.query(
        `update attachments set 
        file_url = COALESCE($1, file_url), 
        file_name = COALESCE($2, file_name), 
        task_id = COALESCE($3, task_id), 
        uploaded_by = COALESCE($4, uploaded_by) 
        where id = $5
        ${returningQuery}`,
        [fileUrl || null, fileName || null, taskId || null, uploaderId || null, id]
    );

    return result.rows[0];
};

export const deleteAttachmentById = async (id) => {
    const result = await db.query(
        `delete from attachments where id = $1`,
        [id]
    );

    return result.rowCount;
};

export const getAttachmentById = async (id) => {
    const result = await db.query(`${selectQuery} where a.id = $1`, [id]);

    return result.rows[0];
};

export const getAttachmentsByTaskId = async (taskId) => {
    const result = await db.query(`${selectQuery} where a.task_id = $1`, [taskId]);

    return result.rows;
};

export const getAttachmentsByUploaderId = async (uploaderId) => {
    const result = await db.query(`${selectQuery} where a.uploaded_by = $1`, [uploaderId]);

    return result.rows;
};
