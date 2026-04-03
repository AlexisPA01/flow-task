import { db } from "../../config/database.js";

const selectQuery = `
    select 
        json_build_object(
            'id', t.id, 
            'title', t.title, 
            'description', t.description
        ) as task,
        json_build_object(
            'id', u.id, 
            'email', u.email
        ) as user
    from task_watchers tw
    inner join tasks t on tw.task_id = t.id 
    inner join users u on tw.user_id = u.id`;

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
        where t.id = task_watchers.task_id
    ) as task,
    (
        select json_build_object(
            'id', u.id,
            'email', u.email
        )
        from users u
        where u.id = task_watchers.user_id
    ) as user
`;

export const getTaskWatchers = async () => {
    const result = await db.query(selectQuery);

    return result.rows;
};

export const createTaskWatcher = async ({ taskId, userId }) => {
    const result = await db.query(
        `insert into task_watchers (task_id, user_id) values ($1, $2)
        ${returningQuery}`,
        [taskId, userId]
    );

    return result.rows[0];
};

export const deleteTaskWatcherByPrimaryKey = async ({ taskId, userId }) => {
    const result = await db.query(
        `delete from task_watchers where task_id = $1 and user_id = $2`,
        [taskId, userId]
    );

    return result.rowCount;
};

export const deleteTaskWatcherByTaskId = async (taskId) => {
    const result = await db.query(
        `delete from task_watchers where task_id = $1`,
        [taskId]
    );

    return result.rowCount;
};

export const deleteTaskWatcherByUserId = async (userId) => {
    const result = await db.query(
        `delete from task_watchers where user_id = $1`,
        [userId]
    );

    return result.rowCount;
};

export const getTaskWatcherByPrimaryKey = async ({ taskId, userId }) => {
    const result = await db.query(`${selectQuery} where tw.task_id = $1 and tw.user_id = $2`, [taskId, userId]);

    return result.rows[0];
};

export const getTaskWatcherByTaskId = async (taskId) => {
    const result = await db.query(`${selectQuery} where tw.task_id = $1`, [taskId]);

    return result.rows;
};

export const getTaskWatcherByUserId = async (userId) => {
    const result = await db.query(`${selectQuery} where tw.user_id = $1`, [userId]);

    return result.rows;
};