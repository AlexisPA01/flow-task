import { createExistsValidator } from "./create-exists-validator.js";
import * as activityLogRepository from "../modules/activity-logs/activity-logs.repository.js";

export const validateActivityLogExists = createExistsValidator({
    getById: activityLogRepository.getActivityLogById,
    entityName: "activity_logs",
    fieldName: "id"
});