import { createExistsValidator } from "./create-exists-validator.js";
import * as taskLabelRepository from "../modules/task-labels/task-labels.repository.js";

export const validateTaskLabelExists = createExistsValidator({
    getById: taskLabelRepository.getTaskLabelByTaskId,
    entityName: "task_labels",
    fieldName: "task_id-label_id"
});