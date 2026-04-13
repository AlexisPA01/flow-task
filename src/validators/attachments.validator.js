import { createExistsValidator } from "./create-exists-validator.js";
import * as attachmentRepository from "../modules/attachments/attachments.repository.js";

export const validateAttachmentExists = createExistsValidator({
    getById: attachmentRepository.getAttachmentById,
    entityName: "attachments",
    fieldName: "id"
});