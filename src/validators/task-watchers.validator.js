import { createExistsValidator } from "./create-exists-validator.js";
import * as taskWatchersRepository from "../modules/task-watchers/task-watchers.repository.js";

export const validateTaskWatcherExists = createExistsValidator({
    getById: taskWatchersRepository.getTaskWatcherByPrimaryKey,
    entityName: "task_watchers",
    fieldName: "task_id-user_id"
});