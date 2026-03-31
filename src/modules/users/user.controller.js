import * as userService from "./user.service.js"
import * as userSchemas from "./user.schema.js"
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();

        return res.status(201).json({
            success: true,
            message: "Users obtained successfully",
            data: users
        });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const parsed = userSchemas.createUserSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const user = await userService.createUser(parsed.data);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const bodyParsed = userSchemas.updateUserSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = userSchemas.getUserByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const user = await userService.updateUser(bodyParsed.data, paramsParsed.data.id);

        return res.status(201).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const updatePasswordUser = async (req, res, next) => {
    try {
        const bodyParsed = userSchemas.updateUserPasswordSchema.safeParse(req.body);

        if (!bodyParsed.success) {
            const flattened = z.flattenError(bodyParsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const paramsParsed = userSchemas.getUserByIdSchema.safeParse(req.params);
        if (!paramsParsed.success) {
            const flattened = z.flattenError(paramsParsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const user = await userService.updatePasswordUser(paramsParsed.data.id, bodyParsed.data.password);

        return res.status(201).json({
            success: true,
            message: "User password updated successfully",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const getUserByEmail = async (req, res, next) => {
    try {
        const parsed = userSchemas.getUserByEmailSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const user = await userService.getUserByEmail(parsed.data.email);

        return res.status(201).json({
            success: true,
            message: "User obtained successfully",
            data: user
        });

    } catch (error) {
        next(error);
    }
};

export const updateManyStatusUser = async (req, res, next) => {
    try {
        const parsed = userSchemas.getManyUserStatus.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const result = await userService.updateManyStatusUser(parsed.data);

        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: {
                updatedCount: result.length,
                users: result
            },
        });
    } catch (error) {
        next(error);
    }
};