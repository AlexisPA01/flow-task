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
        const parsed = userSchemas.updateUserSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const id = req.params.id;

        const user = await userService.updateUser(parsed.data, id);

        return res.status(201).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updatePasswordUser = async (req, res, next) => {
    try {
        const parsed = userSchemas.updateUserPasswordSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const id = req.params.id;

        const user = await userService.updatePasswordUser(id, parsed.data.password);

        return res.status(201).json({
            success: true,
            message: "User password updated successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
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

        const email = req.params.email;

        const user = await userService.getUserByEmail(email);

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