import * as roleService from "./role.service.js"
import * as roleSchemas from "./role.schema.js"
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getRoles = async (req, res, next) => {
    try {
        const roles = await roleService.getRoles();

        return res.status(201).json({
            success: true,
            message: "Roles obtained successfully",
            data: roles
        });
    } catch (error) {
        next(error);
    }
};

export const createRole = async (req, res, next) => {
    try {
        const parsed = roleSchemas.createRoleSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const role = await roleService.createRole(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Role created successfully",
            data: role
        });
    } catch (error) {
        next(error);
    }
};