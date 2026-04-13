import * as roleService from "./role.service.js"
import * as roleSchemas from "./role.schema.js"
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getRoles = async (req, res) => {
    const roles = await roleService.getRoles();

    return res.status(200).json({
        success: true,
        message: "Roles obtained successfully",
        data: roles
    });
};

export const createRole = async (req, res) => {
    const parsed = roleSchemas.createRoleSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const role = await roleService.createRole(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: role
    });
};