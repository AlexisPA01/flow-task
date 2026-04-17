import * as taskWatcherRepository from "./task-watchers.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateTaskWatcherExists } from "../../validators/task-watchers.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getTaskWatchers = async () => {
    const taskWatchers = await taskWatcherRepository.getTaskWatchers();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_watchers",
        entityId: null,
        metadata:
        {
            payload: {},
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskWatchers;
};

export const createTaskWatcher = async ({ taskId, userId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(userId)
    ]);

    const taskWatcher = await taskWatcherRepository.createTaskWatcher({
        taskId,
        userId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "task_watchers",
        entityId: `${taskId}:${userId}`,
        metadata:
        {
            payload: {
                task_id: taskId,
                user_id: userId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskWatcher;
};

export const deleteTaskWatcherByPrimaryKey = async (data) => {
    const existing = await validateTaskWatcherExists(data);

    const result = await taskWatcherRepository.deleteTaskWatcherByPrimaryKey(data);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_watchers",
        entityId: `${data.taskId}:${data.userId}`,
        metadata:
        {
            payload: {
                deleted: existing
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const deleteTaskWatcherByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const existingTaskWatchers = await taskWatcherRepository.getTaskWatcherByTaskId(taskId);

    const result = await taskWatcherRepository.deleteTaskWatcherByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_watchers",
        entityId: taskId,
        metadata:
        {
            payload: {
                deletedCount: existingTaskWatchers.length,
                deletedIds: existingTaskWatchers.map(m => m.id),
                snapshot: existingTaskWatchers.map(m => ({
                    task_id: m.task.id,
                    user_id: m.user.id
                }))
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const deleteTaskWatcherByUserId = async (userId) => {
    await validateTaskExists(userId);

    const existingTaskWatchers = await taskWatcherRepository.getTaskWatcherByUserId(userId);

    const result = await taskWatcherRepository.deleteTaskWatcherByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_watchers",
        entityId: userId,
        metadata:
        {
            payload: {
                deletedCount: existingTaskWatchers.length,
                deletedIds: existingTaskWatchers.map(m => m.id),
                snapshot: existingTaskWatchers.map(m => ({
                    task_id: m.task.id,
                    user_id: m.user.id
                }))
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const getTaskWatcherByPrimaryKey = async ({ taskId, userId }) => {
    const taskWatcher = await validateTaskWatcherExists({ taskId, userId });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_watchers",
        entityId: `${taskId}:${userId}`,
        metadata:
        {
            payload: {
                task_id: taskId,
                user_id: userId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskWatcher;
};

export const getTaskWatcherByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const taskWatcher = await taskWatcherRepository.getTaskWatcherByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_watchers",
        entityId: taskId,
        metadata:
        {
            payload: {
                filter: {
                    task_id: taskId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskWatcher;
};

export const getTaskWatcherByUserId = async (userId) => {
    await validateUserExists(userId)

    const taskWatcher = await taskWatcherRepository.getTaskWatcherByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_watchers",
        entityId: userId,
        metadata:
        {
            payload: {
                filter: {
                    user_id: userId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskWatcher;
};