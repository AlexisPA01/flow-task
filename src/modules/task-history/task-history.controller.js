import * as taskHistoryService from "./task-history.service.js";
import * as taskHistorySchema from "./task-history.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getTaskHistories = async (req, res, next) => {
    try {
        const taskHistories = await taskHistoryService.getTaskHistories();

        return res.status(200).json({
            success: true,
            message: "Task histories obtained successfully",
            data: taskHistories,
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskHistoryById = async (req, res, next) => {
    try {
        const parsed = taskHistorySchema.taskHistoryByIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskHistory = await taskHistoryService.getTaskHistoryById(parsed.data.id);

        if (!taskHistory) {
            throw new AppError(
                "Task history not found",
                404,
                "TASK_HISTORY_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task history obtained successfully",
            data: taskHistory
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskHistoriesByTaskId = async (req, res, next) => {
    try {
        const parsed = taskHistorySchema.taskHistoriesByTaskIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskHistories = await taskHistoryService.getTaskHistoriesByTaskId(parsed.data.taskId);

        if (taskHistories.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task histories found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task histories obtained successfully",
            data: taskHistories
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskHistoriesByChangedId = async (req, res, next) => {
    try {
        const parsed = taskHistorySchema.taskHistoriesByChangedIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskHistories = await taskHistoryService.getTaskHistoriesByChangedId(parsed.data.changedId);

        if (taskHistories.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task histories found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task histories obtained successfully",
            data: taskHistories
        });
    } catch (error) {
        next(error);
    }
};