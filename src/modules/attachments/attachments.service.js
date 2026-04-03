import * as attachmentRepository from "./attachments.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as taskRepository from "../tasks/tasks.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getAttachments = async () => {
    return await attachmentRepository.getAttachments();
};

export const createAttachment = async ({ fileUrl, fileName, taskId, uploaderId }) => {
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

        const user = await userRepository.getUserById(uploaderId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "uploaderId",
                    issue: "not_found"
                }
            );
        }

        const attachment = await attachmentRepository.createAttachment({
            fileUrl, fileName, taskId, uploaderId
        });

        return attachment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateAttachment = async (id, { fileUrl, fileName, taskId, uploaderId }) => {
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

        if (uploaderId !== undefined) {
            const user = await userRepository.getUserById(uploaderId);
            if (!user) {
                throw new AppError(
                    "User does not exist",
                    404,
                    "USER_NOT_FOUND",
                    {
                        field: "uploaderId",
                        issue: "not_found"
                    }
                );
            }
        }

        const attachment = await attachmentRepository.updateAttachment({
            id, fileUrl, fileName, taskId, uploaderId
        });

        return attachment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteAttachmentById = async (id) => {
    try {
        const result = await attachmentRepository.deleteAttachmentById(id);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getAttachmentById = async (id) => {
    try {
        const attachment = await attachmentRepository.getAttachmentById(id);

        return attachment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getAttachmentsByTaskId = async (taskId) => {
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

        const attachment = await attachmentRepository.getAttachmentsByTaskId(taskId);

        return attachment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getAttachmentsByUploaderId = async (uploaderId) => {
    try {
        const user = await userRepository.getUserById(uploaderId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "uploaderId",
                    issue: "not_found"
                }
            );
        }

        const attachment = await attachmentRepository.getAttachmentsByUploaderId(uploaderId);

        return attachment;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};