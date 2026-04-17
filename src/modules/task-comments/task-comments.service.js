import * as taskCommentRepository from "./task-comments.repository.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskCommentExists } from "../../validators/task-comments.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getTaskComments = async () => {
    const taskComments = await taskCommentRepository.getTaskComments();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_comments",
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

    return taskComments;
};

export const createTaskComment = async ({ content, taskId, authorId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(authorId, "author_id")
    ]);

    const taskComment = await taskCommentRepository.createTaskComment({
        content,
        taskId,
        authorId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "task_comments",
        entityId: taskComment.id,
        metadata:
        {
            payload: {
                content,
                task_id: taskId,
                author_id: authorId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskComment;
};

export const updateTaskComment = async (id, { content, taskId, authorId }) => {
    if (taskId !== undefined) {
        await validateTaskExists(taskId);
    }

    if (authorId !== undefined) {
        await validateUserExists(authorId, "author_id");
    }

    const existing = await validateTaskCommentExists(id);

    const taskComment = await taskCommentRepository.updateTaskComment({
        id,
        content,
        taskId,
        authorId
    });

    const changes = {};

    if (content !== undefined && content !== existing.content) {
        changes.content = { from: existing.content, to: content };
    }

    if (taskId !== undefined && taskId !== existing.task.id) {
        changes.task_id = { from: existing.task.id, to: taskId };
    }

    if (author_id !== undefined && author_id !== existing.author.id) {
        changes.author_id = { from: existing.author.id, to: author_id };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "task_comments",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    content: existing.content,
                    task_id: existing.task.id,
                    uploaded_by: existing.author.id
                },
                after: {
                    content: taskComment.content,
                    task_id: taskComment.task.id,
                    uploaded_by: taskComment.author.id
                },
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return taskComment;
};

export const deleteTaskCommentById = async (id) => {
    const existing = await validateTaskCommentExists(id);

    const result = await taskCommentRepository.deleteTaskCommentById(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "task_comments",
        entityId: id,
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

export const getTaskCommentById = async (id) => {
    const taskComment = await validateTaskCommentExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_comments",
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

    return taskComment;
};

export const getTaskCommentsByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const taskComment = await taskCommentRepository.getTaskCommentsByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_comments",
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

    return taskComment;
};

export const getTaskCommentsByAuthorId = async (authorId) => {
    await validateUserExists(authorId, "author_id");

    const taskComment = await taskCommentRepository.getTaskCommentsByAuthorId(authorId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "task_comments",
        entityId: authorId,
        metadata:
        {
            payload: {
                filter: {
                    author_id: authorId
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

    return taskComment;
};