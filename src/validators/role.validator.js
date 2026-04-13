import { createExistsValidator } from "./create-exists-validator.js";
import * as roleRepository from "../modules/role/role.repository.js";

export const validateRoleExists = createExistsValidator({
    getById: roleRepository.getRoleById,
    entityName: "role",
    fieldName: "id"
});