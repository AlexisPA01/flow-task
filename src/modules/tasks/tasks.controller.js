import * as tasksService from "./tasks.service.js";
import * as tasksSchema from "./tasks.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getTasks = async (req, res) => {
    const tasks = await tasksService.getTasks();

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: tasks,
    });
};

export const createTask = async (req, res) => {
    const parsed = tasksSchema.createTaskSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.createTask(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Tasks created successfully",
        data: task
    });
};

export const updateTask = async (req, res) => {
    const bodyParsed = tasksSchema.updateTaskSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = tasksSchema.taskByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.updateTask(
        paramsParsed.data.id,
        bodyParsed.data,
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        message: "Tasks updated successfully",
        data: task
    });
};

export const updateTaskStatus = async (req, res) => {
    const bodyParsed = tasksSchema.updateTaskStatusSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = tasksSchema.taskByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.updateTaskStatus(
        paramsParsed.data.id,
        bodyParsed.data,
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        message: "Tasks status updated successfully",
        data: task
    });
};

export const getTaskById = async (req, res) => {
    const parsed = tasksSchema.taskByIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTaskById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Task obtained successfully",
        data: task
    });
};

export const getTasksByProjectId = async (req, res) => {
    const parsed = tasksSchema.tasksByProjectIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTasksByProjectId(parsed.data.projectId);

    if (task.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: task
    });
};

export const getTasksByUserAssigneeId = async (req, res) => {
    const parsed = tasksSchema.tasksByUserAssigneeIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTasksByUserAssigneeId(parsed.data.assigneeId);

    if (task.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: task
    });
};

export const getTasksByUserReporterId = async (req, res) => {
    const parsed = tasksSchema.tasksByUserReporterIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTasksByUserReporterId(parsed.data.reporterId);

    if (task.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: task
    });
};

export const getTasksByStatusId = async (req, res) => {
    const parsed = tasksSchema.tasksByStatusIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTasksByStatusId(parsed.data.statusId);

    if (task.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: task
    });
};

export const getTasksByPriorityId = async (req, res) => {
    const parsed = tasksSchema.tasksByPriorityIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const task = await tasksService.getTasksByPriorityId(parsed.data.priorityId);

    if (task.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No tasks found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Tasks obtained successfully",
        data: task
    });
};