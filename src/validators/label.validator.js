import { createExistsValidator } from "./create-exists-validator.js";
import * as labelRepository from "../modules/labels/labels.repository.js";

export const validateLabelExists = createExistsValidator({
    getById: labelRepository.getLabelById,
    entityName: "labels",
    fieldName: "id"
});