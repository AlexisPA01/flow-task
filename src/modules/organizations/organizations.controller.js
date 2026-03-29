import * as organizationService from "./organizations.service.js";
import * as organizationSchema from "./organizations.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getOrganizations = async (req, res, next) => {
    try {
        const organizations = await organizationService.getOrganizations();

        return res.status(201).json({
            success: true,
            message: "Organizations obtain successfully",
            data: organizations,
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
            data: organization,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updateOrganization = async (req, res, next) => {
    try {
        const parsed = organizationSchema.createOrganizationSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const id = req.params.id;

        const organization = await organizationService.updateOrganization(id, parsed.data);

        return res.status(201).json({
            success: true,
            message: "Organization updated successfully",
            data: organization,
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

        const id = req.params.id;

        const organization = await organizationService.getOrganizationById(id);

        return res.status(201).json({
            success: true,
            message: "Organization obtained successfully",
            data: organization,
        });
    } catch (error) {
        next(error);
    }
};