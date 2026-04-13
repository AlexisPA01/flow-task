import { createExistsValidator } from "./create-exists-validator.js";
import * as userRepository from "../modules/users/user.repository.js";

export const validateUserExists = createExistsValidator({
    getById: userRepository.getUserById,
    entityName: "users",
    fieldName: "id"
});

export const validateUserEmailExists = createExistsValidator({
    getById: userRepository.getUserByEmail,
    entityName: "users",
    fieldName: "email"
});