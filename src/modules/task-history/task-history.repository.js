import { db } from "../../config/database.js";

const selectQuery = `
    select 
        th.id, 
        th.field,
        th.old_value,
        th.new_value,
        th.created_at,
        json_build_object(
            'id', t.id, 
            'title', t.title, 
            'description', t.description,
            'due_date', t.due_date
        ) as task,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as changer
    from task_history th
    inner join tasks t on th.task_id = t.id 
    inner join users u on th.changed_by = u.id`;

const returningQuery = `
    returning 
        task_history.id, 
        task_history.field,
        task_history.old_value,
        task_history.new_value,
        task_history.created_at,
    (
        select json_build_object(
            'id', t.id,
            'title', t.title,
            'description', t.description,
            'due_date', t.due_date
        )
        from tasks t
        where t.id = task_history.task_id
    ) as task,
    (
        select json_build_object(
            'id', u.id,
            'email', u.email
        )
        from users u
        where u.id = task_history.changed_by
    ) as changer
`;

export const getTaskHistories = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createTaskHistory = async ({ field, oldValue, newValue, taskId, changedId }) => {
    const result = await db.query(
        `insert into task_history (field, old_value, new_value, task_id, changed_by)
     values ($1, $2, $3, $4, $5)
     ${returningQuery}`,
        [field, oldValue, newValue, taskId, changedId]
    );

    return result.rows[0];
};

export const getTaskHistoryById = async (id) => {
    const result = await db.query(`${selectQuery} where th.id = $1`, [id]);

    return result.rows[0];
};

export const getTaskHistoriesByTaskId = async (taskId) => {
    const result = await db.query(`${selectQuery} where th.task_id = $1`, [taskId]);

    return result.rows;
};

export const getTaskHistoriesByChangedId = async (changedId) => {
    const result = await db.query(`${selectQuery} where th.changed_by = $1`, [changedId]);

    return result.rows;
};