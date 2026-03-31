import * as statusService from "./status.service.js"
import * as statusSchemas from "./status.schema.js"
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getStatus = async (req, res, next) => {
    try {
        const status = await statusService.getStatus();

        return res.status(200).json({
            success: true,
            message: "Status obtained successfully",
            data: status
        });
    } catch (error) {
        next(error);
    }
};

export const createStatus = async (req, res, next) => {
    try {
        const parsed = statusSchemas.createStatusSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const status = await statusService.createStatus(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Status created successfully",
            data: status
        });
    } catch (error) {
        next(error);
    }
};