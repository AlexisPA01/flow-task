import * as taskHistoryService from "./task-history.service.js";
import * as taskHistorySchema from "./task-history.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getTaskHistories = async (req, res) => {
    const taskHistories = await taskHistoryService.getTaskHistories();

    return res.status(200).json({
        success: true,
        message: "Task histories obtained successfully",
        data: taskHistories,
    });
};

export const getTaskHistoryById = async (req, res) => {
    const parsed = taskHistorySchema.taskHistoryByIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const taskHistory = await taskHistoryService.getTaskHistoryById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Task history obtained successfully",
        data: taskHistory
    });
};

export const getTaskHistoriesByTaskId = async (req, res) => {
    const parsed = taskHistorySchema.taskHistoriesByTaskIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
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
};

export const getTaskHistoriesByChangedId = async (req, res) => {
    const parsed = taskHistorySchema.taskHistoriesByChangedIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
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
};