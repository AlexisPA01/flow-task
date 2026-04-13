import { createExistsValidator } from "./create-exists-validator.js";
import * as organizationRepository from "../modules/organizations/organizations.repository.js";

export const validateOrganizationExists = createExistsValidator({
    getById: organizationRepository.getOrganizationById,
    entityName: "organizations",
    fieldName: "id"
});