import * as taskRepository from "./tasks.repository.js";
import * as taskHistoryRepository from "../task-history/task-history.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";
import { validatePriorityExists } from "../../validators/priority.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateStatusExists } from "../../validators/status.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getTasks = async () => {
    const tasks = await taskRepository.getTasks();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
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

    return tasks;
};

export const createTask = async ({ title, description, projectId, assigneeId, reporterId, priorityId, dueDate }) => {
    await Promise.all([
        validateUserExists(assigneeId, "assignee_id"),
        validateUserExists(reporterId, "reporter_id"),
        validateProjectExists(projectId),
        validatePriorityExists(priorityId)
    ]);

    const task = await taskRepository.createTask({
        title, description, projectId, assigneeId, reporterId, priorityId, dueDate
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "tasks",
        entityId: task.id,
        metadata:
        {
            payload: {
                title,
                description,
                project_id: projectId,
                assignee_id: assigneeId,
                reporter_id: reporterId,
                status_id: task.status.id,
                priority_id: priorityId,
                due_date: dueDate
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return task;
};

export const updateTask = async (id, { title, description, assigneeId, reporterId, priorityId, dueDate }) => {
    const existing = await validateTaskExists(id);

    const changesTaskHistory = [];
    const changesActivityLogs = {};

    if (title !== undefined && title !== existing.title) {
        changesTaskHistory.push({
            field: "title",
            oldValue: { title: existing.title },
            newValue: { title }
        });
        changesActivityLogs.title = { from: existing.title, to: title };
    }

    if (description !== undefined && description !== existing.description) {
        changesTaskHistory.push({
            field: "description",
            oldValue: { description: existing.description },
            newValue: { description }
        });
        changesActivityLogs.description = { from: existing.description, to: description };
    }

    if (assigneeId !== undefined && assigneeId !== existing.assignee.id) {
        changesTaskHistory.push({
            field: "assignee_id",
            oldValue: { assignee_id: existing.assignee.id },
            newValue: { assignee_id: assigneeId },
        });
        changesActivityLogs.assignee_id = { from: existing.assignee.id, to: assigneeId };
    }

    if (reporterId !== undefined && reporterId !== existing.reporter.id) {
        changesTaskHistory.push({
            field: "reporter_id",
            oldValue: { reporter_id: existing.reporter.id },
            newValue: { reporter_id: reporterId },
        });
        changesActivityLogs.reporter_id = { from: existing.reporter.id, to: reporterId };
    }

    if (priorityId !== undefined && priorityId !== existing.priority.id) {
        changesTaskHistory.push({
            field: "priority_id",
            oldValue: { priority_id: existing.priority.id },
            newValue: { priority_id: priorityId }
        });
        changesActivityLogs.priority_id = { from: existing.priority.id, to: priorityId };
    }

    if (dueDate !== undefined &&
        new Date(dueDate).getTime() !== new Date(existing.due_date).getTime()) {
        changesTaskHistory.push({
            field: "due_date",
            oldValue: { due_date: existing.due_date },
            newValue: { due_date: dueDate }
        });
        changesActivityLogs.due_date = { from: existing.due_date, to: dueDate };
    }

    const updatedTask = await taskRepository.updateTask({
        id,
        title,
        description,
        assigneeId,
        reporterId,
        priorityId,
        dueDate
    });

    const store = asyncLocalStorage.getStore();

    if (changesTaskHistory.length > 0) {
        await Promise.all(
            changesTaskHistory.map(change =>
                taskHistoryRepository.createTaskHistory({
                    field: change.field,
                    oldValue: change.oldValue,
                    newValue: change.newValue,
                    taskId: id,
                    changedId: store?.userId
                })
            )
        );
    }

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "tasks",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    title: existing.title,
                    description: existing.description,
                    project_id: existing.projects.id,
                    assignee_id: existing.assignee.id,
                    reporter_id: existing.reporter.id,
                    priority_id: existing.priority.id,
                    due_date: existing.due_date
                },
                after: {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    project_id: updatedTask.projects.id,
                    assignee_id: updatedTask.assignee.id,
                    reporter_id: updatedTask.reporter.id,
                    priority_id: updatedTask.priority.id,
                    due_date: updatedTask.due_date
                },
                changes: changesActivityLogs
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return updatedTask;
};

export const updateTaskStatus = async (id, { statusId }) => {
    const existing = await validateTaskExists(id);

    await validateStatusExists(statusId);

    if (existing.status.id === statusId) {
        return existing;
    }

    const task = await taskRepository.updateTaskStatus({ id, statusId });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "tasks",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    status_id: existing.status.id
                },
                after: {
                    status_id: task.status.id
                },
                changes: {
                    status_id: statusId
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

    await taskHistoryRepository.createTaskHistory({
        field: "status_id",
        oldValue: { status_id: taskCheck.status.id },
        newValue: { status_id: task.status.id },
        taskId: id,
        changedId: store?.userId
    })

    return task;
};

export const getTaskById = async (id) => {
    const task = await validateTaskExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
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

    return task;
};

export const getTasksByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    const task = await taskRepository.getTasksByProjectId(projectId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
        entityId: projectId,
        metadata:
        {
            payload: {
                filter: {
                    project_id: projectId
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

    return task;
};

export const getTasksByUserAssigneeId = async (assigneeId) => {
    await validateUserExists(assigneeId, "assignee_id");

    const task = await taskRepository.getTasksByUserAssigneeId(assigneeId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
        entityId: assigneeId,
        metadata:
        {
            payload: {
                filter: {
                    assignee_id: assigneeId
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

    return task;
};

export const getTasksByUserReporterId = async (reporterId) => {
    await validateUserExists(reporterId, "reporter_id");

    const task = await taskRepository.getTasksByUserReporterId(reporterId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
        entityId: reporterId,
        metadata:
        {
            payload: {
                filter: {
                    reporter_id: reporterId
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

    return task;
};

export const getTasksByStatusId = async (statusId) => {
    await validateStatusExists(statusId);

    const task = await taskRepository.getTasksByStatusId(statusId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
        entityId: statusId,
        metadata:
        {
            payload: {
                filter: {
                    status_id: statusId
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

    return task;
};

export const getTasksByPriorityId = async (priorityId) => {
    await validatePriorityExists(priorityId);

    const task = await taskRepository.getTasksByPriorityId(priorityId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "tasks",
        entityId: priorityId,
        metadata:
        {
            payload: {
                filter: {
                    priority_id: priorityId
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

    return task;
};