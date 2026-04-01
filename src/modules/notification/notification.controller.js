import * as notificationService from "./notification.service.js";
import * as notificationSchema from "./notification.schema.js";
import { AppError } from "../../middleware/middleware.js";
import { z } from "zod";

export const getNotifications = async (req, res, next) => {
    try {
        const notification = await notificationService.getNotifications();

        return res.status(200).json({
            success: true,
            message: "Notifications obtained successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

export const createNotification = async (req, res, next) => {
    try {
        const parsed = notificationSchema.createNotificationSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notification = await notificationService.createNotification(parsed.data);

        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

export const updateNotificationStatus = async (req, res, next) => {
    try {
        const parsed = notificationSchema.notificationByIdSchema.safeParse(req.body);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notification = await notificationService.updateNotificationStatus(parsed.data.id);

        return res.status(200).json({
            success: true,
            message: "Notification status updated successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

export const getNotificationById = async (req, res, next) => {
    try {
        const parsed = notificationSchema.notificationByIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notification = await notificationService.getNotificationById(parsed.data.id);

        if (!notification) {
            throw new AppError(
                "Notification not found",
                404,
                "NOTIFICATION_NOT_FOUND"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Notification obtained successfully",
            data: notification
        });
    } catch (error) {
        next(error);
    }
};

export const getNotificationsByUserId = async (req, res, next) => {
    try {
        const parsed = notificationSchema.notificationsByUserIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notifications = await notificationService.getNotificationsByUserId(parsed.data.organizationId);

        if (notifications.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No notifications found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notifications obtained successfully",
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};

export const getNotificationsByTypeId = async (req, res, next) => {
    try {
        const parsed = notificationSchema.notificationsByTypeIdSchema.safeParse(req.params);

        if (!parsed.success) {
            const flattened = z.flattenError(parsed.error);
            throw new AppError("Invalid data", 400, "VALIDATION_ERROR", flattened.fieldErrors);
        }

        const notifications = await notificationService.getNotificationsByTypeId(parsed.data.organizationId);

        if (notifications.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No notifications found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notifications obtained successfully",
            data: notifications
        });
    } catch (error) {
        next(error);
    }
};