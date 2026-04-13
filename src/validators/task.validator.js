import { createExistsValidator } from "./create-exists-validator.js";
import * as taskRepository from "../modules/tasks/tasks.repository.js";

export const validateTaskExists = createExistsValidator({
    getById: taskRepository.getTaskById,
    entityName: "task",
    fieldName: "id"
});