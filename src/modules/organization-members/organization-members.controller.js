import * as organizationMemberService from "./organization-members.service.js";
import * as organizationMemberSchema from "./organization-members.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getOrganiationMembers = async (req, res, next) => {
    try {
        const organizationMembers = await organizationMemberService.getOrganiationMembers();

        return res.status(201).json({
            success: true,
            message: "Organization members obtained successfully",
            data: organizationMembers,
        });
    } catch (error) {
        next(error);
    }
};

export const createOrganiationMembers = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.createOrganizationMemberSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organizationMember = await organizationMemberService.createOrganiationMembers(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Organization member created successfully",
            data: organizationMember
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteOrganiationMemberById = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMemberByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const id = req.params.id;

        const result = await organizationMemberService.deleteOrganiationMemberById(id);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Organization member deleted successfully"
                : "No organization member found for this id",
            data: result.deletedCount > 0 ? true : false
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrganiationMembersByOrganizationId = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMembersByOrganizationIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organizationId = req.params.organizationId;

        const result = await organizationMemberService.deleteOrganiationMembersByOrganizationId(organizationId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Organization members deleted successfully"
                : "No organization members found for this organization",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrganiationMembersByUserId = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMembersByUserIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const userId = req.params.userId;

        const result = await organizationMemberService.deleteOrganiationMembersByUserId(userId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Organization members deleted successfully"
                : "No organization members found for this user",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganiationMemberById = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMemberByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const id = req.params.id;

        const organizationMember = await organizationMemberService.getOrganiationMemberById(id);

        return res.status(201).json({
            success: true,
            message: "Organization member obtained successfully",
            data: organizationMember
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganiationMembersByOrganizationId = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMembersByOrganizationIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const organizationId = req.params.organizationId;

        const organizationMember = await organizationMemberService.getOrganiationMembersByOrganizationId(organizationId);

        return res.status(201).json({
            success: true,
            message: "Organization members obtained successfully",
            data: organizationMember
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganiationMembersByUserId = async (req, res, next) => {
    try {
        const parsed = organizationMemberSchema.organiationMembersByUserIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const userId = req.params.userId;

        const organizationMember = await organizationMemberService.getOrganiationMembersByUserId(userId);

        return res.status(201).json({
            success: true,
            message: "Organization members obtained successfully",
            data: organizationMember
        });
    } catch (error) {
        next(error);
    }
};