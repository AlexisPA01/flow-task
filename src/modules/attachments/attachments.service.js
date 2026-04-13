import * as attachmentRepository from "./attachments.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateAttachmentExists } from "../../validators/attachments.validator.js";

export const getAttachments = async () => {
    return attachmentRepository.getAttachments();
};

export const createAttachment = async ({ fileUrl, fileName, taskId, uploaderId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(uploaderId, "uploaded_by")
    ]);

    return attachmentRepository.createAttachment({
        fileUrl, fileName, taskId, uploaderId
    });
};

export const updateAttachment = async (id, { fileUrl, fileName, taskId, uploaderId }) => {
    if (taskId !== undefined) {
        await validateTaskExists(taskId);
    }

    if (uploaderId !== undefined) {
        await validateUserExists(uploaderId, "uploaded_by");
    }

    return attachmentRepository.updateAttachment({
        id, fileUrl, fileName, taskId, uploaderId
    });
};

export const deleteAttachmentById = async (id) => {
    const result = await attachmentRepository.deleteAttachmentById(id);

    return { deletedCount: result || 0 };
};

export const getAttachmentById = async (id) => {
    return await validateAttachmentExists(id);
};

export const getAttachmentsByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    return attachmentRepository.getAttachmentsByTaskId(taskId);
};

export const getAttachmentsByUploaderId = async (uploaderId) => {
    await validateUserExists(uploaderId, "uploaded_by")

    return attachmentRepository.getAttachmentsByUploaderId(uploaderId);
};