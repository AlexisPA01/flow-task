import { createExistsValidator } from "./create-exists-validator.js";
import * as notificationTypeRepository from "../modules/notification-type/notification-type.repository.js";

export const validateNotificationTypeExists = createExistsValidator({
    getById: notificationTypeRepository.getNotificationTypeById,
    entityName: "notification_type",
    fieldName: "id"
});