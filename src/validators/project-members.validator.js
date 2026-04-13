import { createExistsValidator } from "./create-exists-validator.js";
import * as projectMemberRepository from "../modules/project-members/project-members.repository.js";

export const validateProjectMemberExists = createExistsValidator({
    getById: projectMemberRepository.getProjectMemberById,
    entityName: "project_members",
    fieldName: "id"
});