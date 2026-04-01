import * as notificationTypeService from "./notification-type.service.js"
import * as notificationTypeSchemas from "./notification-type.schema.js"
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getNotificationTypes = async (req, res, next) => {
    try {
        const notificationType = await notificationTypeService.getNotificationTypes();

        return res.status(200).json({
            success: true,
            message: "Notification Types obtained successfully",
            data: notificationType
        });
    } catch (error) {
        next(error);
    }
};

export const createNotificationType = async (req, res, next) => {
    try {
        const parsed = notificationTypeSchemas.createNotificationTypeSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notificationType = await notificationTypeService.createNotificationType(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Notification Type created successfully",
            data: notificationType
        });
    } catch (error) {
        next(error);
    }
};