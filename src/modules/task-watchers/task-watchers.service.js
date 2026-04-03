import * as taskWatcherRepository from "./task-watchers.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as taskRepository from "../tasks/tasks.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getTaskWatchers = async () => {
    return await taskWatcherRepository.getTaskWatchers();
};

export const createTaskWatcher = async ({ taskId, userId }) => {
    try {
        const task = await taskRepository.getTaskById(taskId);
        if (!task) {
            throw new AppError(
                "Task does not exist",
                404,
                "TASK_NOT_FOUND",
                {
                    field: "taskId",
                    issue: "not_found"
                }
            );
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const taskWatcher = await taskWatcherRepository.createTaskWatcher({
            taskId,
            userId
        });

        return taskWatcher;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskWatcherByPrimaryKey = async (data) => {
    try {
        const result = await taskWatcherRepository.deleteTaskWatcherByPrimaryKey(data);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskWatcherByTaskId = async (taskId) => {
    try {
        const task = await taskRepository.getTaskById(taskId);

        if (!task) {
            throw new AppError(
                "Task does not exist",
                404,
                "TASK_NOT_FOUND",
                {
                    field: "taskId",
                    issue: "not_found"
                }
            );
        }

        const result = await taskWatcherRepository.deleteTaskWatcherByTaskId(taskId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskWatcherByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const result = await taskWatcherRepository.deleteTaskWatcherByUserId(userId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskWatcherByPrimaryKey = async ({ taskId, userId }) => {
    try {
        const task = await taskRepository.getTaskById(taskId);
        if (!task) {
            throw new AppError(
                "Task does not exist",
                404,
                "TASK_NOT_FOUND",
                {
                    field: "taskId",
                    issue: "not_found"
                }
            );
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const taskWatcher = await taskWatcherRepository.getTaskWatcherByPrimaryKey({ taskId, userId });

        return taskWatcher;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskWatcherByTaskId = async (taskId) => {
    try {
        const task = await taskRepository.getTaskById(taskId);
        if (!task) {
            throw new AppError(
                "Task does not exist",
                404,
                "TASK_NOT_FOUND",
                {
                    field: "taskId",
                    issue: "not_found"
                }
            );
        }

        const taskWatcher = await taskWatcherRepository.getTaskWatcherByTaskId(taskId);

        return taskWatcher;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskWatcherByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const taskWatcher = await taskWatcherRepository.getTaskWatcherByUserId(userId);

        return taskWatcher;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};