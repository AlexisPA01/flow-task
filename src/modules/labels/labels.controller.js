import * as labelService from "./labels.service.js";
import * as labelSchema from "./labels.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getLabels = async (req, res) => {
    const labels = await labelService.getLabels();

    return res.status(200).json({
        success: true,
        message: "Labels obtained successfully",
        data: labels
    });
};

export const createLabel = async (req, res) => {
    const parsed = labelSchema.createLabelSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const label = await labelService.createLabel(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Label created successfully",
        data: label
    });
};

export const updateLabel = async (req, res) => {
    const bodyParsed = labelSchema.updateLabelSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = labelSchema.labelByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const label = await labelService.updateLabel(paramsParsed.data.id, bodyParsed.data);

    return res.status(200).json({
        success: true,
        message: "Label updated successfully",
        data: label
    });
};

export const getLabelById = async (req, res) => {
    const parsed = labelSchema.labelByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const label = await labelService.getLabelById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Label obtained successfully",
        data: label
    });
};

export const getLabelsByOrganizationId = async (req, res) => {
    const parsed = labelSchema.labelByOrganizationIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};