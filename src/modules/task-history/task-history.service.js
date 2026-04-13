import * as taskHistoryRepository from "./task-history.repository.js";
import { validateTaskHistoryExists } from "../../validators/task-history.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";

export const getTaskHistories = async () => {
    return taskHistoryRepository.getTaskHistories();
};

export const getTaskHistoryById = async (id) => {
    return await validateTaskHistoryExists(id);
};

export const getTaskHistoriesByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    return taskHistoryRepository.getTaskHistoriesByTaskId(taskId);
};

export const getTaskHistoriesByChangedId = async (changedId) => {
    await validateUserExists(changedId, "changed_by");

    return taskHistoryRepository.getTaskHistoriesByChangedId(changedId);
};