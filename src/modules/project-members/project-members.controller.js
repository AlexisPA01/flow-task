import * as projectMemberService from "./project-members.service.js";
import * as projectMemberSchema from "./project-members.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getProjectMembers = async (req, res, next) => {
    try {
        const projectMembers = await projectMemberService.getProjectMembers();

        return res.status(200).json({
            success: true,
            message: "Project members obtained successfully",
            data: projectMembers,
        });
    } catch (error) {
        next(error);
    }
};

export const createProjectMembers = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.createProjectMemberSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const projectMember = await projectMemberService.createProjectMembers(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Project member created successfully",
            data: projectMember
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProjectMemberById = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMemberByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await projectMemberService.deleteProjectMemberById(parsed.data.id);

        if (result.deletedCount === 0) {
            throw new AppError(
                "No project member found with this ID",
                404,
                "PROJECT_MEMBER_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Project member deleted successfully",
            data: true
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProjectMembersByProjectId = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMembersByProjectIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await projectMemberService.deleteProjectMembersByProjectId(parsed.data.projectId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Project members deleted successfully"
                : "No project members found for this project",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProjectMembersByUserId = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMembersByUserIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await projectMemberService.deleteProjectMembersByUserId(parsed.data.userId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Project members deleted successfully"
                : "No project members found for this user",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectMemberById = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMemberByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const projectMember = await projectMemberService.getProjectMemberById(parsed.data.id);

        if (!projectMember) {
            throw new AppError(
                "Project member not found",
                404,
                "PROJECT_MEMBER_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Project member obtained successfully",
            data: projectMember
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectMembersByProjectId = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMembersByProjectIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getProjectMembersByUserId = async (req, res, next) => {
    try {
        const parsed = projectMemberSchema.projectMembersByUserIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};