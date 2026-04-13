import * as priorityService from "./priority.service.js"
import * as prioritySchemas from "./priority.schema.js"
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getPriorities = async (req, res) => {
    const priorities = await priorityService.getPriorities();

    return res.status(200).json({
        success: true,
        message: "Priorities obtained successfully",
        data: priorities
    });
};

export const createPriority = async (req, res) => {
    const parsed = prioritySchemas.createPrioritySchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const priority = await priorityService.createPriority(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Priority created successfully",
        data: priority
    });
};