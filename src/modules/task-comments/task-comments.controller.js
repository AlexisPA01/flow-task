import * as taskCommentService from "./task-comments.service.js";
import * as taskCommentSchema from "./task-comments.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { NotFoundError } from "../../errors/not-found.error.js";
import { z } from "zod";

export const getTaskComments = async (req, res) => {
    const taskComments = await taskCommentService.getTaskComments();

    return res.status(200).json({
        success: true,
        message: "Task comments obtained successfully",
        data: taskComments
    });
};

export const createTaskComment = async (req, res) => {
    const parsed = taskCommentSchema.createTaskCommentSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskComment = await taskCommentService.createTaskComment(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Task comment created successfully",
        data: taskComment
    });
};

export const updateTaskComment = async (req, res) => {
    const bodyParsed = taskCommentSchema.updateTaskCommentSchema.safeParse(req.body);

    if (!bodyParsed.success) {
        const flattened = z.flattenError(bodyParsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const paramsParsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);
    if (!paramsParsed.success) {
        const flattened = z.flattenError(paramsParsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const taskComment = await taskCommentService.updateTaskComment(paramsParsed.data.id, bodyParsed.data);

    return res.status(200).json({
        success: true,
        message: "Task comment updated successfully",
        data: taskComment
    });
};

export const deleteTaskCommentById = async (req, res) => {
    const parsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const result = await taskCommentService.deleteTaskCommentById(parsed.data.id);

    if (result.deletedCount === 0) {
        throw new NotFoundError(
            "No task comment found with this Id",
            "TASK_COMMENT_NOT_FOUND"
        );
    }

    return res.status(200).json({
        success: true,
        message: "Task comment deleted successfully",
        data: true
    });
};

export const getTaskCommentById = async (req, res) => {
    const parsed = taskCommentSchema.taskCommentByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const taskComment = await taskCommentService.getTaskCommentById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Task comment obtained successfully",
        data: taskComment
    });
};

export const getTaskCommentsByTaskId = async (req, res) => {
    const parsed = taskCommentSchema.taskCommentsByTaskIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};

export const getTaskCommentsByAuthorId = async (req, res) => {
    const parsed = taskCommentSchema.taskCommentsByAythorIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};