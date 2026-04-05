import * as taskCommentRepository from "./task-comments.repository.js";
import * as taskRepository from "../tasks/tasks.repository.js";
import * as userRepository from "../users/user.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getTaskComments = async () => {
    return await taskCommentRepository.getTaskComments();
};

export const createTaskComment = async ({ content, taskId, authorId }) => {
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

        const user = await userRepository.getUserById(authorId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "authorId",
                    issue: "not_found"
                }
            );
        }

        const taskComment = await taskCommentRepository.createTaskComment({
            content,
            taskId,
            authorId
        });

        return taskComment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateTaskComment = async (id, { content, taskId, authorId }) => {
    try {
        if (taskId !== undefined) {
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
        }

        if (authorId !== undefined) {
            const user = await userRepository.getUserById(authorId);
            if (!user) {
                throw new AppError(
                    "User does not exist",
                    404,
                    "USER_NOT_FOUND",
                    {
                        field: "authorId",
                        issue: "not_found"
                    }
                );
            }
        }

        const taskComment = await taskCommentRepository.updateTaskComment({
            id,
            content,
            taskId,
            authorId
        });

        return taskComment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskCommentById = async (id) => {
    try {
        const result = await taskCommentRepository.deleteTaskCommentById(id);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskCommentById = async (id) => {
    try {
        const taskComment = await taskCommentRepository.getTaskCommentById(id);

        return taskComment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskCommentsByTaskId = async (taskId) => {
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

        const taskComment = await taskCommentRepository.getTaskCommentsByTaskId(taskId);

        return taskComment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskCommentsByAuthorId = async (authorId) => {
    try {
        const user = await userRepository.getUserById(authorId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "authorId",
                    issue: "not_found"
                }
            );
        }

        const taskComment = await taskCommentRepository.getTaskCommentsByAuthorId(authorId);

        return taskComment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};