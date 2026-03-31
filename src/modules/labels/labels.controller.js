import * as labelService from "./labels.service.js";
import * as labelSchema from "./labels.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getLabels = async (req, res, next) => {
    try {
        const labels = await labelService.getLabels();

        return res.status(200).json({
            success: true,
            message: "Labels obtained successfully",
            data: labels
        });
    } catch (error) {
        next(error);
    }
};

export const createLabel = async (req, res, next) => {
    try {
        const parsed = labelSchema.createLabelSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const label = await labelService.createLabel(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Label created successfully",
            data: label
        });
    } catch (error) {
        next(error);
    }
};

export const updateLabel = async (req, res, next) => {
    try {
        const bodyParsed = labelSchema.updateLabelSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = labelSchema.labelByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const label = await labelService.updateLabel(paramsParsed.data.id, bodyParsed.data);

        return res.status(200).json({
            success: true,
            message: "Label updated successfully",
            data: label
        });
    } catch (error) {
        next(error);
    }
};

export const getLabelById = async (req, res, next) => {
    try {
        const parsed = labelSchema.labelByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const label = await labelService.getLabelById(parsed.data.id);

        if (!label) {
            throw new AppError(
                "Label not found",
                404,
                "LABEL_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Label obtained successfully",
            data: label
        });
    } catch (error) {
        next(error);
    }
};

export const getLabelsByOrganizationId = async (req, res, next) => {
    try {
        const parsed = labelSchema.labelByOrganizationIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const labels = await labelService.getLabelsByOrganizationId(parsed.data.organizationId);

        if (labels.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No labels found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Labels obtained successfully",
            data: labels
        });
    } catch (error) {
        next(error);
    }
};