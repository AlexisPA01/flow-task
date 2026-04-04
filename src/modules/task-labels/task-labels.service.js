import * as taskLabelRepository from "./task-labels.repository.js";
import * as taskRepository from "../tasks/tasks.repository.js";
import * as labelRepository from "../labels/labels.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getTaskLabels = async () => {
    return await taskLabelRepository.getTaskLabels();
};

export const createTaskLabel = async ({ taskId, labelId }) => {
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

        const label = await labelRepository.getLabelById(labelId);
        if (!label) {
            throw new AppError(
                "Label does not exist",
                404,
                "LABEL_NOT_FOUND",
                {
                    field: "labelId",
                    issue: "not_found"
                }
            );
        }

        const taskLabel = await taskLabelRepository.createTaskLabel({
            taskId,
            labelId
        });

        return taskLabel;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskLabelByPrimaryKey = async (data) => {
    try {
        const result = await taskLabelRepository.deleteTaskLabelByPrimaryKey(data);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskLabelByTaskId = async (taskId) => {
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

        const result = await taskLabelRepository.deleteTaskLabelByTaskId(taskId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteTaskLabelByLabelId = async (labelId) => {
    try {
        const user = await labelRepository.getLabelById(labelId);
        if (!user) {
            throw new AppError(
                "Label does not exist",
                404,
                "LABEL_NOT_FOUND",
                {
                    field: "labelId",
                    issue: "not_found"
                }
            );
        }

        const result = await taskLabelRepository.deleteTaskLabelByLabelId(labelId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskLabelByPrimaryKey = async ({ taskId, labelId }) => {
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

        const label = await labelRepository.getLabelById(labelId);
        if (!label) {
            throw new AppError(
                "Label does not exist",
                404,
                "LABEL_NOT_FOUND",
                {
                    field: "labelId",
                    issue: "not_found"
                }
            );
        }

        const taskLabel = await taskLabelRepository.getTaskLabelByPrimaryKey({ taskId, labelId });

        return taskLabel;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskLabelByTaskId = async (taskId) => {
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

        const taskLabel = await taskLabelRepository.getTaskLabelByTaskId(taskId);

        return taskLabel;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTaskLabelByLabelId = async (labelId) => {
    try {
        const user = await labelRepository.getLabelById(labelId);
        if (!user) {
            throw new AppError(
                "Label does not exist",
                404,
                "LABEL_NOT_FOUND",
                {
                    field: "labelId",
                    issue: "not_found"
                }
            );
        }

        const taskLabel = await taskLabelRepository.getTaskLabelByLabelId(labelId);

        return taskLabel;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};