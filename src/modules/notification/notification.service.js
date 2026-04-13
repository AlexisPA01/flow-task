import * as notificationRepository from "./notification.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateNotificationTypeExists } from "../../validators/notification-type.validator.js";
import { validateNotificationExists } from "../../validators/notification.validator.js";

export const getNotifications = async () => {
    return notificationRepository.getNotifications();
};

export const createNotification = async ({ title, message, userId, typeId }) => {
    await Promise.all([
        validateUserExists(userId),
        validateNotificationTypeExists(typeId)
    ]);

    return notificationRepository.createNotification({
        title,
        message,
        userId,
        typeId
    });
};

export const updateNotificationStatus = async (id) => {
    await validateNotificationExists(id);

    return notificationRepository.updateNotificationStatus(id);
};

export const getNotificationById = async (id) => {
    return await validateNotificationExists(id);
};

export const getNotificationsByUserId = async (userId) => {
    await validateUserExists(userId);

    return notificationRepository.getNotificationsByUserId(userId);
};


export const getNotificationsByTypeId = async (typeId) => {
    await validateNotificationTypeExists(typeId);

    return notificationRepository.getNotificationsByTypeId(userId);
};