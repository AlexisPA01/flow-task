import * as taskCommentService from "./task-comments.service.js";
import * as taskCommentSchema from "./task-comments.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getTaskComments = async (req, res, next) => {
    try {
        const taskComments = await taskCommentService.getTaskComments();

        return res.status(200).json({
            success: true,
            message: "Task comments obtained successfully",
            data: taskComments
        });
    } catch (error) {
        next(error);
    }
};

export const createTaskComment = async (req, res, next) => {
    try {
        const parsed = taskCommentSchema.createTaskCommentSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskComment = await taskCommentService.createTaskComment(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Task comment created successfully",
            data: taskComment
        });
    } catch (error) {
        next(error);
    }
};

export const updateTaskComment = async (req, res, next) => {
    try {
        const bodyParsed = taskCommentSchema.updateTaskCommentSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskComment = await taskCommentService.updateTaskComment(paramsParsed.data.id, bodyParsed.data);

        if (!taskComment) {
            throw new AppError("Task comment not found", 404, "ORGANIZATION_NOT_FOUND");
        }

        return res.status(200).json({
            success: true,
            message: "Task comment updated successfully",
            data: taskComment
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTaskCommentById = async (req, res, next) => {
    try {
        const parsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await taskCommentService.deleteTaskCommentById(parsed.data.id);

        if (result.deletedCount === 0) {
            throw new AppError(
                "No task comment found with this ID",
                404,
                "TASK_COMMENT_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task comment deleted successfully",
            data: true
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskCommentById = async (req, res, next) => {
    try {
        const parsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskComment = await taskCommentService.getTaskCommentById(parsed.data.id);

        if (!taskComment) {
            throw new AppError(
                "Task comment not found",
                404,
                "TASK_COMMENT_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Task comment obtained successfully",
            data: taskComment
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskCommentsByTaskId = async (req, res, next) => {
    try {
        const parsed = taskCommentSchema.taskCommentsByTaskIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskCommentMember = await taskCommentService.getTaskCommentsByTaskId(parsed.data.taskId);

        if (taskCommentMember.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task comments found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task comments obtained successfully",
            data: taskCommentMember
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskCommentsByAuthorId = async (req, res, next) => {
    try {
        const parsed = taskCommentSchema.taskCommentsByAythorIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const taskCommentMember = await taskCommentService.getTaskCommentsByAuthorId(parsed.data.authorId);

        if (taskCommentMember.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No task comments found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task comments obtained successfully",
            data: taskCommentMember
        });
    } catch (error) {
        next(error);
    }
};