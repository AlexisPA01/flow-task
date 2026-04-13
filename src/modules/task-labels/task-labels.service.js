import * as taskLabelRepository from "./task-labels.repository.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateLabelExists } from "../../validators/label.validator.js";
import { validateTaskLabelExists } from "../../validators/task-labels.validator.js";

export const getTaskLabels = async () => {
    return taskLabelRepository.getTaskLabels();
};

export const createTaskLabel = async ({ taskId, labelId }) => {
    await Promise.all([
        validateTaskExists(taskId),
        validateLabelExists(labelId)
    ]);

    return taskLabelRepository.createTaskLabel({
        taskId,
        labelId
    });
};

export const deleteTaskLabelByPrimaryKey = async (data) => {
    const result = await taskLabelRepository.deleteTaskLabelByPrimaryKey(data);

    return { deletedCount: result || 0 };
};

export const deleteTaskLabelByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    const result = await taskLabelRepository.deleteTaskLabelByTaskId(taskId);

    return { deletedCount: result || 0 };
};

export const deleteTaskLabelByLabelId = async (labelId) => {
    await validateLabelExists(labelId);

    const result = await taskLabelRepository.deleteTaskLabelByLabelId(labelId);

    return { deletedCount: result || 0 };
};

export const getTaskLabelByPrimaryKey = async ({ taskId, labelId }) => {
    return await validateTaskLabelExists({ taskId, labelId });
};

export const getTaskLabelByTaskId = async (taskId) => {
    await validateTaskExists(taskId);

    return taskLabelRepository.getTaskLabelByTaskId(taskId);
};

export const getTaskLabelByLabelId = async (labelId) => {
    await validateLabelExists(labelId);

    return taskLabelRepository.getTaskLabelByLabelId(labelId);
};