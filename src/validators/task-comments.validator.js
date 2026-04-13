import { createExistsValidator } from "./create-exists-validator.js";
import * as taskCommentRepository from "../modules/task-comments/task-comments.repository.js";

export const validateTaskCommentExists = createExistsValidator({
    getById: taskCommentRepository.getTaskCommentById,
    entityName: "task_comments",
    fieldName: "id"
});