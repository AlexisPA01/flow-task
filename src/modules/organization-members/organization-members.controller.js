import * as organizationMemberService from "./organization-members.service.js";
import * as organizationMemberSchema from "./organization-members.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getOrganizationMembers = async (req, res) => {
    const organizationMembers = await organizationMemberService.getOrganizationMembers();

    return res.status(200).json({
        success: true,
        message: "Organization members obtained successfully",
        data: organizationMembers,
    });
};

export const createOrganizationMembers = async (req, res) => {
    const parsed = organizationMemberSchema.createOrganizationMemberSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.createOrganizationMembers(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Organization member created successfully",
        data: organizationMember
    });
};

export const deleteOrganizationMemberById = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganizationMemberById(parsed.data.id);

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

export const deleteOrganizationMembersByOrganizationId = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMembersByOrganizationIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganizationMembersByOrganizationId(parsed.data.organizationId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Organization members deleted successfully"
            : "No organization members found for this organization",
        data: result.deletedCount
    });
};

export const deleteOrganizationMembersByUserId = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await organizationMemberService.deleteOrganizationMembersByUserId(parsed.data.userId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Organization members deleted successfully"
            : "No organization members found for this user",
        data: result.deletedCount
    });
};

export const getOrganizationMemberById = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganizationMemberById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Organization member obtained successfully",
        data: organizationMember
    });
};

export const getOrganizationMembersByOrganizationId = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMembersByOrganizationIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganizationMembersByOrganizationId(parsed.data.organizationId);

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

export const getOrganizationMembersByUserId = async (req, res) => {
    const parsed = organizationMemberSchema.organizationMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const organizationMember = await organizationMemberService.getOrganizationMembersByUserId(parsed.data.userId);

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