import { db } from "../../config/database.js";

const selectQuery = `
    select 
        json_build_object(
            'id', t.id, 
            'title', t.title, 
            'description', t.description
        ) as task,
        json_build_object(
            'id', l.id, 
            'name', l.name,
            'color', l.color
        ) as label
    from task_labels tl
    inner join tasks t on tl.task_id = t.id 
    inner join labels l on tl.label_id = l.id`;

const returningQuery = `
    returning 
    (
        select json_build_object(
            'id', t.id,
            'title', t.title,
            'description', t.description,
            'due_date', t.due_date
        )
        from tasks t
        where t.id = task_labels.task_id
    ) as task,
    (
        select json_build_object(
            'id', l.id, 
            'name', l.name,
            'color', l.color
        )
        from labels l
        where l.id = task_labels.label_id
    ) as user
`;

export const getTaskLabels = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createTaskLabel = async ({ taskId, labelId }) => {
    const result = await db.query(
        `insert into task_labels (task_id, label_id) values ($1, $2)
        ${returningQuery}`,
        [taskId, labelId]
    );

    return result.rows[0];
};

export const deleteTaskLabelByPrimaryKey = async ({ taskId, labelId }) => {
    const result = await db.query(
        `delete from task_labels where task_id = $1 and label_id = $2`,
        [taskId, labelId]
    );

    return result.rowCount;
};

export const deleteTaskLabelByTaskId = async (taskId) => {
    const result = await db.query(
        `delete from task_labels where task_id = $1`,
        [taskId]
    );

    return result.rowCount;
};

export const deleteTaskLabelByLabelId = async (labelId) => {
    const result = await db.query(
        `delete from task_labels where label_id = $1`,
        [labelId]
    );

    return result.rowCount;
};

export const getTaskLabelByPrimaryKey = async ({ taskId, labelId }) => {
    const result = await db.query(`${selectQuery} where tl.task_id = $1 and tl.label_id = $2`, [taskId, labelId]);

    return result.rows[0];
};

export const getTaskLabelByTaskId = async (taskId) => {
    const result = await db.query(`${selectQuery} where tl.task_id = $1`, [taskId]);

    return result.rows;
};

export const getTaskLabelByLabelId = async (labelId) => {
    const result = await db.query(`${selectQuery} where tl.label_id = $1`, [labelId]);

    return result.rows;
};