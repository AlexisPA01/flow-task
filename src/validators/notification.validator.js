import { createExistsValidator } from "./create-exists-validator.js";
import * as notificationRepository from "../modules/notification/notification.repository.js";

export const validateNotificationExists = createExistsValidator({
    getById: notificationRepository.getNotificationById,
    entityName: "notification",
    fieldName: "id"
});