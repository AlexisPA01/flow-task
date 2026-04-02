import * as tasksService from "./tasks.service.js";
import * as tasksSchema from "./tasks.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await tasksService.getTasks();

        return res.status(200).json({
            success: true,
            message: "Tasks obtained successfully",
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const parsed = tasksSchema.createTaskSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const task = await tasksService.createTask(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Tasks created successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const bodyParsed = tasksSchema.updateTaskSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = tasksSchema.taskByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const task = await tasksService.updateTask(paramsParsed.data.id, bodyParsed.data);

        if (!task) {
            throw new AppError("Tasks not found", 404, "TASK_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Tasks updated successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const updateTaskStatus = async (req, res, next) => {
    try {
        const bodyParsed = tasksSchema.updateTaskStatusSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = tasksSchema.taskByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const task = await tasksService.updateTaskStatus(paramsParsed.data.id, bodyParsed.data);

        if (!task) {
            throw new AppError("Tasks not found", 404, "TASK_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Tasks status updated successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const parsed = tasksSchema.taskByIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const task = await tasksService.getTaskById(parsed.data.id);

        if (!task) {
            throw new AppError(
                "Task not found",
                404,
                "TASK_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task obtained successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const getTasksByProjectId = async (req, res, next) => {
    try {
        const parsed = tasksSchema.tasksByProjectIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getTasksByUserAssigneeId = async (req, res, next) => {
    try {
        const parsed = tasksSchema.tasksByUserAssigneeIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getTasksByUserReporterId = async (req, res, next) => {
    try {
        const parsed = tasksSchema.tasksByUserReporterIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getTasksByStatusId = async (req, res, next) => {
    try {
        const parsed = tasksSchema.tasksByStatusIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getTasksByPriorityId = async (req, res, next) => {
    try {
        const parsed = tasksSchema.tasksByPriorityIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};