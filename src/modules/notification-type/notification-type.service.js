import * as notificationTypeRepository from "./notification-type.repository.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getNotificationTypes = async () => {
    const notificationTypes = await notificationTypeRepository.getNotificationTypes();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "notification_type",
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

    return notificationTypes;
};

export const createNotificationType = async ({ name }) => {
    const notificationType = await notificationTypeRepository.createNotificationType({ name });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "notification_type",
        entityId: notificationType.id,
        metadata:
        {
            payload: {
                name
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return notificationType;
};