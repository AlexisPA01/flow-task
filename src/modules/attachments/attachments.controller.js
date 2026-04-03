import * as attachmentService from "./attachments.service.js";
import * as attachmentSchema from "./attachments.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getAttachments = async (req, res, next) => {
    try {
        const attachments = await attachmentService.getAttachments();

        return res.status(200).json({
            success: true,
            message: "Attachments obtained successfully",
            data: attachments
        });
    } catch (error) {
        next(error);
    }
};

export const createAttachment = async (req, res, next) => {
    try {
        const parsed = attachmentSchema.createAttachmentSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const attachment = await attachmentService.createAttachment(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Attachment created successfully",
            data: attachment
        });
    } catch (error) {
        next(error);
    }
};

export const updateAttachment = async (req, res, next) => {
    try {
        const bodyParsed = attachmentSchema.updateAttachmentSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const attachment = await attachmentService.updateAttachment(paramsParsed.data.id, bodyParsed.data);

        if (!attachment) {
            throw new AppError("Attachment not found", 404, "ORGANIZATION_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Attachment updated successfully",
            data: attachment
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAttachmentById = async (req, res, next) => {
    try {
        const parsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await attachmentService.deleteAttachmentById(parsed.data.id);

        if (result.deletedCount === 0) {
            throw new AppError(
                "No attachment found with this ID",
                404,
                "ATTACHMENT_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Attachment deleted successfully",
            data: true
        });
    } catch (error) {
        next(error);
    }
};

export const getAttachmentById = async (req, res, next) => {
    try {
        const parsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const attachment = await attachmentService.getAttachmentById(parsed.data.id);

        if (!attachment) {
            throw new AppError(
                "Attachment not found",
                404,
                "ATTACHMENT_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Attachment obtained successfully",
            data: attachment
        });
    } catch (error) {
        next(error);
    }
};

export const getAttachmentsByTaskId = async (req, res, next) => {
    try {
        const parsed = attachmentSchema.attachmentsByTaskIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const attachmentMember = await attachmentService.getAttachmentsByTaskId(parsed.data.taskId);

        if (attachmentMember.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attachment found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attachment obtained successfully",
            data: attachmentMember
        });
    } catch (error) {
        next(error);
    }
};

export const getAttachmentsByUploaderId = async (req, res, next) => {
    try {
        const parsed = attachmentSchema.attachmentsByUploaderIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const attachmentMember = await attachmentService.getAttachmentsByUploaderId(parsed.data.uploaderId);

        if (attachmentMember.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attachment found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Attachment obtained successfully",
            data: attachmentMember
        });
    } catch (error) {
        next(error);
    }
};