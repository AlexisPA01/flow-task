import { createExistsValidator } from "./create-exists-validator.js";
import * as priorityRepository from "../modules/priority/priority.repository.js";

export const validatePriorityExists = createExistsValidator({
    getById: priorityRepository.getPriorityById,
    entityName: "priority",
    fieldName: "id"
});