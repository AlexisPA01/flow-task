import { createExistsValidator } from "./create-exists-validator.js";
import * as organizationMemberRepository from "../modules/organization-members/organization-members.repository.js";

export const validateOrganizationMemberExists = createExistsValidator({
    getById: organizationMemberRepository.getOrganiationMemberById,
    entityName: "organization_members",
    fieldName: "id"
});