import * as activityLogService from "./activity-logs.service.js";
import * as activityLogSchema from "./activity-logs.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getActivityLogs = async (req, res, next) => {
    try {
        const activityLogs = await activityLogService.getActivityLogs();

        return res.status(200).json({
            success: true,
            message: "Activity logsobtained successfully",
            data: activityLogs,
        });
    } catch (error) {
        next(error);
    }
};

export const getActivityLogById = async (req, res, next) => {
    try {
        const parsed = activityLogSchema.activityLogByIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const activityLog = await activityLogService.getActivityLogById(parsed.data.id);

        if (!activityLog) {
            throw new AppError(
                "Activity log not found",
                404,
                "ACTIVITY_LOG_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Activity log obtained successfully",
            data: activityLog
        });
    } catch (error) {
        next(error);
    }
};

export const getActivityLogsByOrganizationId = async (req, res, next) => {
    try {
        const parsed = activityLogSchema.activityLogsByOrganizationIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};

export const getActivityLogsByUserId = async (req, res, next) => {
    try {
        const parsed = activityLogSchema.activityLogsByUserIdSchema.safeParse(req.params);
        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid params", 400, "VALIDATION_ERROR", flattened.fieldErrors);
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
    } catch (error) {
        next(error);
    }
};