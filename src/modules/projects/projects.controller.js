import * as projectService from "./projects.service.js";
import * as projectSchema from "./projects.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getProjects();

        return res.status(200).json({
            success: true,
            message: "Projects obtained successfully",
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

export const createOrganiationMembers = async (req, res, next) => {
    try {
        const parsed = projectSchema.createProjectSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const project = await projectService.createProject(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const bodyParsed = projectSchema.updateProjectSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = projectSchema.projectByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const project = await projectService.updateProject(paramsParsed.data.id, bodyParsed.data);

        if (!project) {
            throw new AppError("Project not found", 404, "PROJECT_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const parsed = projectSchema.projectByIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const project = await projectService.getProjectById(parsed.data.id);

        if (!project) {
            throw new AppError(
                "Project not found",
                404,
                "PROJECT_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Project obtained successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectsByOrganizationId = async (req, res, next) => {
    try {
        const parsed = projectSchema.projectsByOrganizationIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const project = await projectService.getProjectsByOrganizationId(parsed.data.organizationId);

        if (project === 0) {
            return res.status(200).json({
                success: true,
                message: "No projects found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Projects obtained successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const getProjectsByUserId = async (req, res, next) => {
    try {
        const parsed = projectSchema.projectsByUserIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const project = await projectService.getProjectsByUserId(parsed.data.userId);

        if (project === 0) {
            return res.status(200).json({
                success: true,
                message: "No projects found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Projects obtained successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};