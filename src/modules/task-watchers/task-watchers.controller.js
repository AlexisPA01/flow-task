import * as taskWarcherService from "./task-watchers.service.js";
import * as taskWatcherSchema from "./task-watchers.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getTaskWatchers = async (req, res) => {
    const taskWatchers = await taskWarcherService.getTaskWatchers();

    return res.status(200).json({
        success: true,
        message: "Task watchers obtained successfully",
        data: taskWatchers,
    });
};

export const createTaskWatcher = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatcherByPrimaryKeySchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskWatcher = await taskWarcherService.createTaskWatcher(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Task watcher created successfully",
        data: taskWatcher
    });
};

export const deleteTaskWatcherByPrimaryKey = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatcherByPrimaryKeySchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskWarcherService.deleteTaskWatcherByPrimaryKey(parsed.data);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No task watcher found with this Id",
            "TASK_WATCHER_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Task watcher deleted successfully",
        data: true
    });
};

export const deleteTaskWatcherByTaskId = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatchersByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskWarcherService.deleteTaskWatcherByTaskId(parsed.data.taskId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Task watchers deleted successfully"
            : "No task watchers found for this task",
        data: result.deletedCount
    });
};

export const deleteTaskWatcherByUserId = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatchersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskWarcherService.deleteTaskWatcherByUserId(parsed.data.userId);

    return res.status(200).json({
        success: true,
        message: result.deletedCount > 0
            ? "Task watchers deleted successfully"
            : "No task watchers found for this user",
        data: result.deletedCount
    });
};

export const getTaskWatcherByPrimaryKey = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatcherByPrimaryKeySchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskWatcher = await taskWarcherService.getTaskWatcherByPrimaryKey(parsed.data);

    return res.status(200).json({
        success: true,
        message: "Task watcher obtained successfully",
        data: taskWatcher
    });
};

export const getTaskWatcherByTaskId = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatchersByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskWatcher = await taskWarcherService.getTaskWatcherByTaskId(parsed.data.taskId);

    if (taskWatcher.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No task watchers found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task watchers obtained successfully",
        data: taskWatcher
    });
};

export const getTaskWatcherByUserId = async (req, res) => {
    const parsed = taskWatcherSchema.taskWatchersByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskWatcher = await taskWarcherService.getTaskWatcherByUserId(parsed.data.userId);

    if (taskWatcher.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No task watchers found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task watchers obtained successfully",
        data: taskWatcher
    });
};