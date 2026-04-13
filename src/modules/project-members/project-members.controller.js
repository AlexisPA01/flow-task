import * as projectMemberService from "./project-members.service.js";
import * as projectMemberSchema from "./project-members.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getProjectMembers = async (req, res) => {
    const projectMembers = await projectMemberService.getProjectMembers();

    return res.status(200).json({
        success: true,
        message: "Project members obtained successfully",
        data: projectMembers,
    });
};

export const createProjectMembers = async (req, res) => {
    const parsed = projectMemberSchema.createProjectMemberSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const projectMember = await projectMemberService.createProjectMembers(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Project member created successfully",
        data: projectMember
    });
};

export const deleteProjectMemberById = async (req, res) => {
    const parsed = projectMemberSchema.projectMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await projectMemberService.deleteProjectMemberById(parsed.data.id);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No project member found with this Id",
            "PROJECT_MEMBER_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Project member deleted successfully",
        data: true
    });
};

export const deleteProjectMembersByProjectId = async (req, res) => {
    const parsed = projectMemberSchema.projectMembersByProjectIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await projectMemberService.deleteProjectMembersByProjectId(parsed.data.projectId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Project members deleted successfully"
            : "No project members found for this project",
        data: result.deletedCount
    });
};

export const deleteProjectMembersByUserId = async (req, res) => {
    const parsed = projectMemberSchema.projectMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await projectMemberService.deleteProjectMembersByUserId(parsed.data.userId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Project members deleted successfully"
            : "No project members found for this user",
        data: result.deletedCount
    });
};

export const getProjectMemberById = async (req, res) => {
    const parsed = projectMemberSchema.projectMemberByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const projectMember = await projectMemberService.getProjectMemberById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Project member obtained successfully",
        data: projectMember
    });
};

export const getProjectMembersByProjectId = async (req, res) => {
    const parsed = projectMemberSchema.projectMembersByProjectIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const projectMember = await projectMemberService.getProjectMembersByProjectId(parsed.data.projectId);

    if (projectMember === 0) {
        return res.status(200).json({
            success: true,
            message: "No project members found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Project members obtained successfully",
        data: projectMember
    });
};

export const getProjectMembersByUserId = async (req, res) => {
    const parsed = projectMemberSchema.projectMembersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const projectMember = await projectMemberService.getProjectMembersByUserId(parsed.data.userId);

    if (projectMember.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No project members found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Project members obtained successfully",
        data: projectMember
    });
};