import * as priorityService from "./priority.service.js"
import * as prioritySchemas from "./priority.schema.js"
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getPriorities = async (req, res, next) => {
    try {
        const priorities = await priorityService.getPriorities();

        return res.status(200).json({
            success: true,
            message: "Priorities obtained successfully",
            data: priorities
        });
    } catch (error) {
        next(error);
    }
};

export const createPriority = async (req, res, next) => {
    try {
        const parsed = prioritySchemas.createPrioritySchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const priority = await priorityService.createPriority(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Priority created successfully",
            data: priority
        });
    } catch (error) {
        next(error);
    }
};