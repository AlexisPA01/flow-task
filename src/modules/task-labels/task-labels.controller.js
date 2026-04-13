import * as taskLabelService from "./task-labels.service.js";
import * as taskLabelSchema from "./task-labels.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getTaskLabels = async (req, res) => {
    const taskLabels = await taskLabelService.getTaskLabels();

    return res.status(200).json({
        success: true,
        message: "Task labels obtained successfully",
        data: taskLabels,
    });
};

export const createTaskLabel = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskLabel = await taskLabelService.createTaskLabel(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Task label created successfully",
        data: taskLabel
    });
};

export const deleteTaskLabelByPrimaryKey = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskLabelService.deleteTaskLabelByPrimaryKey(parsed.data);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No task label found with this Id",
            "TASK_LABEL_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Task label deleted successfully",
        data: true
    });
};

export const deleteTaskLabelByTaskId = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelsByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskLabelService.deleteTaskLabelByTaskId(parsed.data.taskId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Task labels deleted successfully"
            : "No task labels found for this task",
        data: result.deletedCount
    });
};

export const deleteTaskLabelByLabelId = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelsByLabelIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskLabelService.deleteTaskLabelByLabelId(parsed.data.labelId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Task labels deleted successfully"
            : "No task labels found for this label",
        data: result.deletedCount
    });
};

export const getTaskLabelByPrimaryKey = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelByPrimaryKeySchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskLabel = await taskLabelService.getTaskLabelByPrimaryKey(parsed.data);

    return res.status(200).json({
        success: true,
        message: "Task label obtained successfully",
        data: taskLabel
    });
};

export const getTaskLabelByTaskId = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelsByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};

export const getTaskLabelByLabelId = async (req, res) => {
    const parsed = taskLabelSchema.taskLabelsByLabelIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};