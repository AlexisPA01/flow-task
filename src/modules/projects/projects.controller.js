import * as projectService from "./projects.service.js";
import * as projectSchema from "./projects.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getProjects = async (req, res) => {
    const projects = await projectService.getProjects();

    return res.status(200).json({
        success: true,
        message: "Projects obtained successfully",
        data: projects,
    });
};

export const createProject = async (req, res) => {
    const parsed = projectSchema.createProjectSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const project = await projectService.createProject(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project
    });
};

export const updateProject = async (req, res) => {
    const bodyParsed = projectSchema.updateProjectSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = projectSchema.projectByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const project = await projectService.updateProject(paramsParsed.data.id, bodyParsed.data);

    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: project
    });
};

export const getProjectById = async (req, res) => {
    const parsed = projectSchema.projectByIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const project = await projectService.getProjectById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Project obtained successfully",
        data: project
    });
};

export const getProjectsByOrganizationId = async (req, res) => {
    const parsed = projectSchema.projectsByOrganizationIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const project = await projectService.getProjectsByOrganizationId(parsed.data.organizationId);

    if (project.length === 0) {
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
};

export const getProjectsByUserId = async (req, res) => {
    const parsed = projectSchema.projectsByUserIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const project = await projectService.getProjectsByUserId(parsed.data.createdBy);

    if (project.length === 0) {
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
};