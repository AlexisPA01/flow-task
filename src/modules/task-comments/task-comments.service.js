import * as taskCommentRepository from "./task-comments.repository.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskCommentExists } from "../../validators/task-comments.validator.js";

export const getTaskComments = async () => {
    return taskCommentRepository.getTaskComments();
};

export const createTaskComment = async ({ content, taskId, authorId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(authorId, "author_id")
    ]);

    return taskCommentRepository.createTaskComment({
        content,
        taskId,
        authorId
    });
};

export const updateTaskComment = async (id, { content, taskId, authorId }) => {
    if (taskId !== undefined) {
        await validateTaskExists(taskId);
    }

    if (authorId !== undefined) {
        await validateUserExists(authorId, "author_id");
    }

    await validateTaskCommentExists(id);

    return taskCommentRepository.updateTaskComment({
        id,
        content,
        taskId,
        authorId
    });
};

export const deleteTaskCommentById = async (id) => {
    const result = await taskCommentRepository.deleteTaskCommentById(id);

    return { deletedCount: result || 0 };
};

export const getTaskCommentById = async (id) => {
    return await validateTaskCommentExists(id);
};

export const getTaskCommentsByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    return taskCommentRepository.getTaskCommentsByTaskId(taskId);
};

export const getTaskCommentsByAuthorId = async (authorId) => {
    await validateUserExists(authorId, "author_id");

    return taskCommentRepository.getTaskCommentsByAuthorId(authorId);
};