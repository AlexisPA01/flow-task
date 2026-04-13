import * as attachmentService from "./attachments.service.js";
import * as attachmentSchema from "./attachments.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getAttachments = async (req, res) => {
    const attachments = await attachmentService.getAttachments();

    return res.status(200).json({
        success: true,
        message: "Attachments obtained successfully",
        data: attachments
    });
};

export const createAttachment = async (req, res) => {
    const parsed = attachmentSchema.createAttachmentSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const attachment = await attachmentService.createAttachment(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Attachment created successfully",
        data: attachment
    });
};

export const updateAttachment = async (req, res) => {
    const bodyParsed = attachmentSchema.updateAttachmentSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const attachment = await attachmentService.updateAttachment(paramsParsed.data.id, bodyParsed.data);

    return res.status(200).json({
        success: true,
        message: "Attachment updated successfully",
        data: attachment
    });
};

export const deleteAttachmentById = async (req, res) => {
    const parsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await attachmentService.deleteAttachmentById(parsed.data.id);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No attachment found with this Id",
            "ATTACHMENT_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Attachment deleted successfully",
        data: true
    });
};

export const getAttachmentById = async (req, res) => {
    const parsed = attachmentSchema.attachmentByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const attachment = await attachmentService.getAttachmentById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Attachment obtained successfully",
        data: attachment
    });
};

export const getAttachmentsByTaskId = async (req, res) => {
    const parsed = attachmentSchema.attachmentsByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};

export const getAttachmentsByUploaderId = async (req, res) => {
    const parsed = attachmentSchema.attachmentsByUploaderIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};