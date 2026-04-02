import * as organizationService from "./organizations.service.js";
import * as organizationSchema from "./organizations.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getOrganizations = async (req, res, next) => {
    try {
        const organizations = await organizationService.getOrganizations();

        return res.status(200).json({
            success: true,
            message: "Organizations obtained successfully",
            data: organizations
        });
    } catch (error) {
        next(error);
    }
};

export const createOrganization = async (req, res, next) => {
    try {
        const parsed = organizationSchema.createOrganizationSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organization = await organizationService.createOrganization(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrganization = async (req, res, next) => {
    try {
        const bodyParsed = organizationSchema.updateOrganizationSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = organizationSchema.getOrganizationById.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organization = await organizationService.updateOrganization(paramsParsed.data.id, bodyParsed.data);

        if (!organization) {
            throw new AppError("Organization not found", 404, "ORGANIZATION_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganizationById = async (req, res, next) => {
    try {
        const parsed = organizationSchema.getOrganizationById.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organization = await organizationService.getOrganizationById(parsed.data.id);

        if (!organization) {
            throw new AppError(
                "Organization not found",
                404,
                "ORGANIZATION_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Organization obtained successfully",
            data: organization
        });
    } catch (error) {
        next(error);
    }
};