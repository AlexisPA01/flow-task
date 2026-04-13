import * as notificationTypeRepository from "./notification-type.repository.js";

export const getNotificationTypes = async () => {
    return notificationTypeRepository.getNotificationTypes();
};

export const createNotificationType = async ({ name }) => {
    return notificationTypeRepository.createNotificationType({ name });
};