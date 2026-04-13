import * as organizationService from "./organizations.service.js";
import * as organizationSchema from "./organizations.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getOrganizations = async (req, res) => {
    const organizations = await organizationService.getOrganizations();

    return res.status(200).json({
        success: true,
        message: "Organizations obtained successfully",
        data: organizations
    });
};

export const createOrganization = async (req, res) => {
    const parsed = organizationSchema.createOrganizationSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organization = await organizationService.createOrganization(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Organization created successfully",
        data: organization
    });
};

export const updateOrganization = async (req, res) => {
    const bodyParsed = organizationSchema.updateOrganizationSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = organizationSchema.getOrganizationById.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const organization = await organizationService.updateOrganization(paramsParsed.data.id, bodyParsed.data);

    return res.status(200).json({
        success: true,
        message: "Organization updated successfully",
        data: organization
    });
};

export const getOrganizationById = async (req, res) => {
    const parsed = organizationSchema.getOrganizationById.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organization = await organizationService.getOrganizationById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Organization obtained successfully",
        data: organization
    });
};