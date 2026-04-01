import * as notificationTypeRepository from "./notification-type.repository.js";
import { mapDatabaseError } from "../../middleware/middleware.js";

export const getNotificationTypes = async () => {
    return await notificationTypeRepository.getNotificationTypes();
};

export const createNotificationType = async ({ name }) => {
    try {
        const notificationType = await notificationTypeRepository.createNotificationType({ name });

        return notificationType;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};