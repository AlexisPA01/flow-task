import * as organizationMemberService from "./organization-members.service.js";
import * as organizationMemberSchema from "./organization-members.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getOrganiationMembers = async (req, res) => {
    const organizationMembers = await organizationMemberService.getOrganiationMembers();

    return res.status(200).json({
        success: true,
        message: "Organization members obtained successfully",
        data: organizationMembers,
    });
};

export const createOrganiationMembers = async (req, res) => {
    const parsed = organizationMemberSchema.createOrganizationMemberSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.createOrganiationMembers(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Organization member created successfully",
        data: organizationMember
    });
};

export const deleteOrganiationMemberById = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganiationMemberById(parsed.data.id);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No organization member found with this Id",
            "ORGANIZATION_MEMBER_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Organization member deleted successfully",
        data: true
    });
};

export const deleteOrganiationMembersByOrganizationId = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMembersByOrganizationIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganiationMembersByOrganizationId(parsed.data.organizationId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Organization members deleted successfully"
            : "No organization members found for this organization",
        data: result.deletedCount
    });
};

export const deleteOrganiationMembersByUserId = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganiationMembersByUserId(parsed.data.userId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Organization members deleted successfully"
            : "No organization members found for this user",
        data: result.deletedCount
    });
};

export const getOrganiationMemberById = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganiationMemberById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Organization member obtained successfully",
        data: organizationMember
    });
};

export const getOrganiationMembersByOrganizationId = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMembersByOrganizationIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganiationMembersByOrganizationId(parsed.data.organizationId);

    if (organizationMember.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No organization members found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Organization members obtained successfully",
        data: organizationMember
    });
};

export const getOrganiationMembersByUserId = async (req, res) => {
    const parsed = organizationMemberSchema.organiationMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganiationMembersByUserId(parsed.data.userId);

    if (organizationMember.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No organization members found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Organization members obtained successfully",
        data: organizationMember
    });
}