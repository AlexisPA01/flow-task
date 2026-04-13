import { createExistsValidator } from "./create-exists-validator.js";
import * as projectRepository from "../modules/projects/projects.repository.js";

export const validateProjectExists = createExistsValidator({
    getById: projectRepository.getProjectById,
    entityName: "projects",
    fieldName: "id"
});