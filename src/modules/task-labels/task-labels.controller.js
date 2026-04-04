import * as taskLabelService from "./task-labels.service.js";
import * as taskLabelSchema from "./task-labels.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getTaskLabels = async (req, res, next) => {
    try {
        const taskLabels = await taskLabelService.getTaskLabels();

        return res.status(200).json({
            success: true,
            message: "Task labels obtained successfully",
            data: taskLabels,
        });
    } catch (error) {
        next(error);
    }
};

export const createTaskLabel = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskLabel = await taskLabelService.createTaskLabel(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Task label created successfully",
            data: taskLabel
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaskLabelByPrimaryKey = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await taskLabelService.deleteTaskLabelByPrimaryKey(parsed.data);

        if (result.deletedCount === 0) {
            throw new AppError(
                "No task label found with this ID",
                404,
                "TASK_WATCHER_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task label deleted successfully",
            data: true
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaskLabelByTaskId = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelsByTaskIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await taskLabelService.deleteTaskLabelByTaskId(parsed.data.taskId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Task labels deleted successfully"
                : "No task labels found for this task",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaskLabelByLabelId = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelsByLabelIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await taskLabelService.deleteTaskLabelByLabelId(parsed.data.labelId);

        return res.status(200).json({
            success: true,
            message: result.deletedCount > 0
                ? "Task labels deleted successfully"
                : "No task labels found for this label",
            data: result.deletedCount
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskLabelByPrimaryKey = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskLabel = await taskLabelService.getTaskLabelByPrimaryKey(parsed.data);

        if (!taskLabel) {
            throw new AppError(
                "Task label not found",
                404,
                "TASK_WATCHER_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task label obtained successfully",
            data: taskLabel
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskLabelByTaskId = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelsByTaskIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskLabel = await taskLabelService.getTaskLabelByTaskId(parsed.data.taskId);

        if (taskLabel.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task labels found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task labels obtained successfully",
            data: taskLabel
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskLabelByLabelId = async (req, res, next) => {
    try {
        const parsed = taskLabelSchema.taskLabelsByLabelIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskLabel = await taskLabelService.getTaskLabelByLabelId(parsed.data.labelId);

        if (taskLabel.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task labels found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task labels obtained successfully",
            data: taskLabel
        });
    } catch (error) {
        next(error);
    }
};