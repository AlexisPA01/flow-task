import * as statusService from "./status.service.js"
import * as statusSchemas from "./status.schema.js"
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getStatus = async (req, res) => {
    const status = await statusService.getStatus();

    return res.status(200).json({
        success: true,
        message: "Status obtained successfully",
        data: status
    });
};

export const createStatus = async (req, res) => {
    const parsed = statusSchemas.createStatusSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const status = await statusService.createStatus(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Status created successfully",
        data: status
    });
};