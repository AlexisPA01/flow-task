import * as taskLabelRepository from "./task-labels.repository.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateLabelExists } from "../../validators/label.validator.js";
import { validateTaskLabelExists } from "../../validators/task-labels.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getTaskLabels = async () => {
    const taskLabels = await taskLabelRepository.getTaskLabels();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_labels",
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

    return taskLabels;
};

export const createTaskLabel = async ({ taskId, labelId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateLabelExists(labelId)
    ]);

    const taskLabel = await taskLabelRepository.createTaskLabel({
        taskId,
        labelId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "task_labels",
        entityId: `${taskId}:${labelId}`,
        metadata:
        {
            payload: {
                task_id: taskId,
                label_id: labelId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskLabel;
};

export const deleteTaskLabelByPrimaryKey = async (data) => {
    const existing = await validateTaskLabelExists(data);

    const result = await taskLabelRepository.deleteTaskLabelByPrimaryKey(data);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_labels",
        entityId: `${data.taskId}:${data.labelId}`,
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

export const deleteTaskLabelByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const existingTaskLabels = await taskLabelRepository.getTaskLabelByTaskId(taskId);

    const result = await taskLabelRepository.deleteTaskLabelByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_labels",
        entityId: taskId,
        metadata:
        {
            payload: {
                deletedCount: existingTaskLabels.length,
                deletedIds: existingTaskLabels.map(m => m.id),
                snapshot: existingTaskLabels.map(m => ({
                    task_id: m.task.id,
                    label_id: m.label.id
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

export const deleteTaskLabelByLabelId = async (labelId) => {
    await validateLabelExists(labelId);

    const existingTaskLabels = await taskLabelRepository.getTaskLabelByLabelId(labelId);

    const result = await taskLabelRepository.deleteTaskLabelByLabelId(labelId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_labels",
        entityId: labelId,
        metadata:
        {
            payload: {
                deletedCount: existingTaskLabels.length,
                deletedIds: existingTaskLabels.map(m => m.id),
                snapshot: existingTaskLabels.map(m => ({
                    task_id: m.task.id,
                    label_id: m.label.id
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

export const getTaskLabelByPrimaryKey = async ({ taskId, labelId }) => {
    const taskLabel = await validateTaskLabelExists({ taskId, labelId });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_labels",
        entityId: `${taskId}:${labelId}`,
        metadata:
        {
            payload: {
                task_id: taskId,
                label_id: labelId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskLabel;
};

export const getTaskLabelByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const taskLabel = await taskLabelRepository.getTaskLabelByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_labels",
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

    return taskLabel;
};

export const getTaskLabelByLabelId = async (labelId) => {
    await validateLabelExists(labelId);

    const taskLabel = await taskLabelRepository.getTaskLabelByLabelId(labelId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_labels",
        entityId: labelId,
        metadata:
        {
            payload: {
                filter: {
                    label_id: labelId
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

    return taskLabel;
};