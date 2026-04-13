import { createExistsValidator } from "./create-exists-validator.js";
import * as taskHistoryRepository from "../modules/task-history/task-history.repository.js";

export const validateTaskHistoryExists = createExistsValidator({
    getById: taskHistoryRepository.getTaskHistoryById,
    entityName: "task_history",
    fieldName: "id"
});