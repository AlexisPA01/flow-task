import * as activityLogService from "./activity-logs.service.js";
import * as activityLogSchema from "./activity-logs.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getActivityLogs = async (req, res) => {
    const activityLogs = await activityLogService.getActivityLogs();

    return res.status(200).json({
        success: true,
        message: "Activity logsobtained successfully",
        data: activityLogs,
    });
};

export const getActivityLogById = async (req, res) => {
    const parsed = activityLogSchema.activityLogByIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const activityLog = await activityLogService.getActivityLogById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Activity log obtained successfully",
        data: activityLog
    });
};

export const getActivityLogsByOrganizationId = async (req, res) => {
    const parsed = activityLogSchema.activityLogsByOrganizationIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const activityLog = await activityLogService.getActivityLogsByOrganizationId(parsed.data.organizationId);

    if (activityLog.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No activity logs found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Activity logs obtained successfully",
        data: activityLog
    });
};

export const getActivityLogsByUserId = async (req, res) => {
    const parsed = activityLogSchema.activityLogsByUserIdSchema.safeParse(req.params);
    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid params",
            flattened.fieldErrors
        );
    }

    const activityLog = await activityLogService.getActivityLogsByUserId(parsed.data.userId);

    if (activityLog.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No activity logs found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        message: "Activity logs obtained successfully",
        data: activityLog
    });
};