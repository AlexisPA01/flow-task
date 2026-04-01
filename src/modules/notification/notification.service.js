import * as notificationRepository from "./notification.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as notificatonTypeRepository from "../notification-type/notification-type.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getNotifications = async () => {
    return await notificationRepository.getNotifications();
};

export const createNotification = async ({ title, message, userId, typeId }) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const type = await notificatonTypeRepository.getNotificationTypeById(typeId);
        if (!type) {
            throw new AppError(
                "Notification Type does not exist",
                404,
                "NOTIFICATION_TYPE_NOT_FOUND",
                {
                    field: "tpyeId",
                    issue: "not_found"
                }
            );
        }

        const notification = await notificationRepository.createNotification({
            title,
            message,
            userId,
            typeId
        });

        return notification;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateNotificationStatus = async (id) => {
    try {
        const notification = await notificationRepository.updateNotificationStatus(id);

        return notification;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getNotificationById = async (id) => {
    try {
        return await notificationRepository.getNotificationById(id);
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getNotificationsByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const notification = await notificationRepository.getNotificationsByUserId(userId);

        return notification;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};


export const getNotificationsByTypeId = async (typeId) => {
    try {
        const type = await notificatonTypeRepository.getNotificationTypeById(typeId);
        if (!type) {
            throw new AppError(
                "Notification Type does not exist",
                404,
                "NOTIFICATION_TYPE_NOT_FOUND",
                {
                    field: "tpyeId",
                    issue: "not_found"
                }
            );
        }

        const notification = await notificationRepository.getNotificationsByTypeId(userId);

        return notification;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};