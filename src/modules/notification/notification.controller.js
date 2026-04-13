import * as notificationService from "./notification.service.js";
import * as notificationSchema from "./notification.schema.js";
import { BadRequestError } from "../../errors/bad-request.error.js";
import { z } from "zod";

export const getNotifications = async (req, res) => {
    const notification = await notificationService.getNotifications();

    return res.status(200).json({
        success: true,
        message: "Notifications obtained successfully",
        data: notification
    });
};

export const createNotification = async (req, res) => {
    const parsed = notificationSchema.createNotificationSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const notification = await notificationService.createNotification(parsed.data);

    return res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: notification
    });
};

export const updateNotificationStatus = async (req, res) => {
    const parsed = notificationSchema.notificationByIdSchema.safeParse(req.body);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const notification = await notificationService.updateNotificationStatus(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Notification status updated successfully",
        data: notification
    });
};

export const getNotificationById = async (req, res) => {
    const parsed = notificationSchema.notificationByIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
    }

    const notification = await notificationService.getNotificationById(parsed.data.id);

    return res.status(200).json({
        success: true,
        message: "Notification obtained successfully",
        data: notification
    });
};

export const getNotificationsByUserId = async (req, res) => {
    const parsed = notificationSchema.notificationsByUserIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};

export const getNotificationsByTypeId = async (req, res) => {
    const parsed = notificationSchema.notificationsByTypeIdSchema.safeParse(req.params);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        throw new BadRequestError(
            "Invalid data",
            flattened.fieldErrors
        );
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
};