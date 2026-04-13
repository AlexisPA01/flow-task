import * as taskWatcherRepository from "./task-watchers.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateTaskWatcherExists } from "../../validators/task-watchers.validator.js";

export const getTaskWatchers = async () => {
    return taskWatcherRepository.getTaskWatchers();
};

export const createTaskWatcher = async ({ taskId, userId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(userId)
    ]);

    return await taskWatcherRepository.createTaskWatcher({
        taskId,
        userId
    });
};

export const deleteTaskWatcherByPrimaryKey = async (data) => {
    const result = await taskWatcherRepository.deleteTaskWatcherByPrimaryKey(data);

    return { deletedCount: result || 0 };
};

export const deleteTaskWatcherByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const result = await taskWatcherRepository.deleteTaskWatcherByTaskId(taskId);

    return { deletedCount: result || 0 };
};

export const deleteTaskWatcherByUserId = async (userId) => {
    await validateTaskExists(userId);

    const result = await taskWatcherRepository.deleteTaskWatcherByUserId(userId);

    return { deletedCount: result || 0 };
};

export const getTaskWatcherByPrimaryKey = async ({ taskId, userId }) => {
    return await validateTaskWatcherExists({ taskId, userId });
};

export const getTaskWatcherByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    return taskWatcherRepository.getTaskWatcherByTaskId(taskId);
};

export const getTaskWatcherByUserId = async (userId) => {
    await validateUserExists(userId)

    return taskWatcherRepository.getTaskWatcherByUserId(userId);
};