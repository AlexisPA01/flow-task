import { createExistsValidator } from "./create-exists-validator.js";
import * as statusRepository from "../modules/status/status.repository.js";

export const validateStatusExists = createExistsValidator({
    getById: statusRepository.getStatusById,
    entityName: "status",
    fieldName: "id"
});