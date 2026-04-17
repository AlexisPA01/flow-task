import * as taskHistoryRepository from "./task-history.repository.js";
import { validateTaskHistoryExists } from "../../validators/task-history.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getTaskHistories = async () => {
    const taskHistories = await taskHistoryRepository.getTaskHistories();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_history",
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

    return taskHistories;
};

export const getTaskHistoryById = async (id) => {
    const taskHistory = await validateTaskHistoryExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_history",
        entityId: id,
        metadata:
        {
            payload: {
                id
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskHistory;
};

export const getTaskHistoriesByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const taskHistory = await taskHistoryRepository.getTaskHistoriesByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_history",
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

    return taskHistory;
};

export const getTaskHistoriesByChangedId = async (changedId) => {
    await validateUserExists(changedId, "changed_by");

    const taskHistory = await taskHistoryRepository.getTaskHistoriesByChangedId(changedId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_history",
        entityId: changedId,
        metadata:
        {
            payload: {
                filter: {
                    changed_by: changedId
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

    return taskHistory;
};