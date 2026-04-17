import * as attachmentRepository from "./attachments.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateAttachmentExists } from "../../validators/attachments.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getAttachments = async () => {
    const attachments = await attachmentRepository.getAttachments();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "attachments",
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

    return attachments;
};

export const createAttachment = async ({ fileUrl, fileName, taskId, uploaderId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateUserExists(uploaderId, "uploaded_by")
    ]);

    const attachment = await attachmentRepository.createAttachment({
        fileUrl, fileName, taskId, uploaderId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "attachments",
        entityId: attachment.id,
        metadata:
        {
            payload: {
                file_url: fileUrl,
                file_name: fileName,
                task_id: taskId,
                uploaded_by: uploaderId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return attachment;
};

export const updateAttachment = async (id, { fileUrl, fileName, taskId, uploaderId }) => {
    if (taskId !== undefined) {
        await validateTaskExists(taskId);
    }

    if (uploaderId !== undefined) {
        await validateUserExists(uploaderId, "uploaded_by");
    }

    const existing = await validateAttachmentExists(id);

    const attachment = await attachmentRepository.updateAttachment({
        id, fileUrl, fileName, taskId, uploaderId
    });

    const changes = {};

    if (fileUrl !== undefined && fileUrl !== existing.fileUrl) {
        changes.file_url = { from: existing.fileUrl, to: fileUrl };
    }

    if (fileName !== undefined && fileName !== existing.fileName) {
        changes.file_name = { from: existing.fileName, to: fileName };
    }

    if (taskId !== undefined && taskId !== existing.task.id) {
        changes.task_id = { from: existing.task.id, to: taskId };
    }

    if (uploaderId !== undefined && uploaderId !== existing.uploader.id) {
        changes.uploaded_by = { from: existing.uploader.id, to: uploaderId };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "attachments",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    file_url: existing.file_url,
                    file_name: existing.file_name,
                    task_id: existing.task.id,
                    uploaded_by: existing.uploader.id
                },
                after: {
                    file_url: attachment.file_url,
                    file_name: attachment.file_name,
                    task_id: attachment.task.id,
                    uploaded_by: attachment.uploader.id
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

    return attachment;
};

export const deleteAttachmentById = async (id) => {
    const existing = await validateAttachmentExists(id);

    const result = await attachmentRepository.deleteAttachmentById(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "attachments",
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

export const getAttachmentById = async (id) => {
    const attachment = await validateAttachmentExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "attachments",
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

    return attachment;
};

export const getAttachmentsByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const attachment = await attachmentRepository.getAttachmentsByTaskId(taskId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "attachments",
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

    return attachment;
};

export const getAttachmentsByUploaderId = async (uploaderId) => {
    await validateUserExists(uploaderId, "uploaded_by")

    const attachment = await attachmentRepository.getAttachmentsByUploaderId(uploaderId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "attachments",
        entityId: uploaderId,
        metadata:
        {
            payload: {
                filter: {
                    uploaded_by: uploaderId
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

    return attachment;
};