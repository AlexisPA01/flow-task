import * as taskHistoryRepository from "./task-history.repository.js";
import * as taskRepository from "../tasks/tasks.repository.js";
import * as userRepository from "../users/user.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getTaskHistories = async () => {
    return await taskHistoryRepository.getTaskHistories();
};

export const getTaskHistoryById = async (id) => {
    try {
        const taskHistory = await taskHistoryRepository.getTaskHistoryById(id);

        if (!taskHistory) {
            throw new AppError(
                "Task history not found",
                404,
                "TASK_HISTORY_NOT_FOUND"
            );
        }

        return taskHistory;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskHistoriesByTaskId = async (taskId) => {
    try {
        const task = await taskRepository.getTaskById(taskId);
        if (!task) {
            throw new AppError(
                "Task does not exist",
                404,
                "TASK_NOT_FOUND",
                {
                    field: "taskId",
                    issue: "not_found"
                }
            );
        }

        const taskHistories = await taskHistoryRepository.getTaskHistoriesByTaskId(taskId);

        return taskHistories;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskHistoriesByChangedId = async (changedId) => {
    try {
        const user = await userRepository.getUserById(changedId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "changedId",
                    issue: "not_found"
                }
            );
        }

        const taskHistories = await taskHistoryRepository.getTaskHistoriesByChangedId(changedId);

        return taskHistories;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};