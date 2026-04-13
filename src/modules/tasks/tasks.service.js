import * as taskRepository from "./tasks.repository.js";
import * as taskHistoryRepository from "../task-history/task-history.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";
import { validatePriorityExists } from "../../validators/priority.validator.js";
import { validateTaskExists } from "../../validators/task.validator.js";
import { validateStatusExists } from "../../validators/status.validator.js";

export const getTasks = async () => {
    return taskRepository.getTasks();
};

export const createTask = async ({ title, description, projectId, assigneeId, reporterId, priorityId, dueDate }) => {
    await Promise.all([
        validateUserExists(assigneeId, "assignee_id"),
        validateUserExists(reporterId, "reporter_id"),
        validateProjectExists(projectId),
        validatePriorityExists(priorityId)
    ]);

    return taskRepository.createTask({
        title, description, projectId, assigneeId, reporterId, priorityId, dueDate
    });
};

export const updateTask = async (id, data) => {
    const existingTask = await validateTaskExists(id);

    const {
        title,
        description,
        assigneeId,
        reporterId,
        priorityId,
        dueDate
    } = data;

    // const changes = [];

    // if (title !== undefined && title !== existingTask.title) {
    //     changes.push({
    //         field: "title",
    //         oldValue: existingTask.title,
    //         newValue: title
    //     });
    // }

    // if (description !== undefined && description !== existingTask.description) {
    //     changes.push({
    //         field: "description",
    //         oldValue: existingTask.description,
    //         newValue: description
    //     });
    // }

    // if (assigneeId !== undefined && assigneeId !== existingTask.assignee_id) {
    //     changes.push({
    //         field: "assignee_id",
    //         oldValue: existingTask.assignee_id,
    //         newValue: assigneeId
    //     });
    // }

    // if (priorityId !== undefined && priorityId !== existingTask.priority_id) {
    //     changes.push({
    //         field: "priority_id",
    //         oldValue: existingTask.priority_id,
    //         newValue: priorityId
    //     });
    // }

    // if (dueDate !== undefined && dueDate !== existingTask.due_date) {
    //     changes.push({
    //         field: "due_date",
    //         oldValue: existingTask.due_date,
    //         newValue: dueDate
    //     });
    // }

    const updatedTask = await taskRepository.updateTask({
        id,
        title,
        description,
        assigneeId,
        reporterId,
        priorityId,
        dueDate
    });

    // if (changes.length > 0) {
    //     await Promise.all(
    //         changes.map(change =>
    //             taskHistoryRepository.createTaskHistory({
    //                 field: change.field,
    //                 oldValue: change.oldValue,
    //                 newValue: change.newValue,
    //                 taskId: id,
    //                 changedId: userId
    //             })
    //         )
    //     );
    // }

    return updatedTask;
};

export const updateTaskStatus = async (id, { statusId }) => {
    const task = await validateTaskExists(id);

    await validateStatusExists(statusId);

    if (task.status_id === statusId) {
        return task;
    }

    return taskRepository.updateTaskStatus({ id, statusId });
};

export const getTaskById = async (id) => {
    return await validateTaskExists(id);
};

export const getTasksByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    return taskRepository.getTasksByProjectId(projectId);
};

export const getTasksByUserAssigneeId = async (assigneeId) => {
    await validateUserExists(assigneeId, "assignee_id");

    return taskRepository.getTasksByUserAssigneeId(assigneeId);
};

export const getTasksByUserReporterId = async (reporterId) => {
    await validateUserExists(reporterId, "reporter_id");

    return taskRepository.getTasksByUserReporterId(reporterId);
};

export const getTasksByStatusId = async (statusId) => {
    await validateStatusExists(statusId);

    return taskRepository.getTasksByStatusId(statusId);
};

export const getTasksByPriorityId = async (priorityId) => {
    await validatePriorityExists(priorityId);

    return taskRepository.getTasksByPriorityId(priorityId);
};