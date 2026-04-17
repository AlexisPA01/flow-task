import * as notificationRepository from "./notification.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateNotificationTypeExists } from "../../validators/notification-type.validator.js";
import { validateNotificationExists } from "../../validators/notification.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getNotifications = async () => {
    const notifications = await notificationRepository.getNotifications();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "notification",
        entityId: null,
        metadata:
        {
            payload: {},
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notifications;
};

export const createNotification = async ({ title, message, userId, typeId }) => {
    await Promise.all([
        validateUserExists(userId),
        validateNotificationTypeExists(typeId, "typeId")
    ]);

    const notification = await notificationRepository.createNotification({
        title,
        message,
        userId,
        typeId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "notification",
        entityId: notification.id,
        metadata:
        {
            payload: {
                title,
                message,
                user_id: userId,
                type_id: typeId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notification;
};

export const updateNotificationStatus = async (id) => {
    const existing = await validateNotificationExists(id);

    const notification = await notificationRepository.updateNotificationStatus(id);

    const changes = {};

    if (notification.is_read !== existing.is_read) {
        changes.is_read = { from: existing.is_read, to: notification.is_read };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "notification",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    is_read: existing.is_read
                },
                after: {
                    is_read: notification.is_read
                },
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notification;
};

export const getNotificationById = async (id) => {
    const notification = await validateNotificationExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "notification",
        entityId: id,
        metadata:
        {
            payload: {
                id
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notification;
};

export const getNotificationsByUserId = async (userId) => {
    await validateUserExists(userId);

    const notification = await notificationRepository.getNotificationsByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "notification",
        entityId: userId,
        metadata:
        {
            payload: {
                filter: {
                    user_id: userId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notification;
};


export const getNotificationsByTypeId = async (typeId) => {
    await validateNotificationTypeExists(typeId, "typeId");

    const notification = await notificationRepository.getNotificationsByTypeId(typeId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "notification",
        entityId: typeId,
        metadata:
        {
            payload: {
                filter: {
                    type_id: typeId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notification;
};