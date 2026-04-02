import * as taskRepository from "./tasks.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as projectRepository from "../projects/projects.repository.js";
import * as priorityRepository from "../priority/priority.repository.js";
import * as statusRepository from "../status/status.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getTasks = async () => {
    return await taskRepository.getTasks();
};

export const createTask = async ({ title, description, projectId, assigneeId, reporterId, priorityId, dueDate }) => {
    try {
        if (assigneeId !== undefined) {
            const userAssignee = await userRepository.getUserById(assigneeId);
            if (!userAssignee) {
                throw new AppError(
                    "User does not exist",
                    404,
                    "USER_NOT_FOUND",
                    {
                        field: "assigneeId",
                        issue: "not_found"
                    }
                );
            }
        }

        const userreporter = await userRepository.getUserById(reporterId);
        if (!userreporter) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "reporterId",
                    issue: "not_found"
                }
            );
        }

        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new AppError(
                "project does not exist",
                404,
                "PROJECT_NOT_FOUND",
                {
                    field: "projectId",
                    issue: "not_found"
                }
            );
        }

        const priority = await priorityRepository.getPriorityById(priorityId);
        if (!priority) {
            throw new AppError(
                "priority does not exist",
                404,
                "PRIORITY_NOT_FOUND",
                {
                    field: "priorityId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.createTask({
            title, description, projectId, assigneeId, reporterId, priorityId, dueDate
        });

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateTask = async (id, { title, description, assigneeId, reporterId, priorityId, dueDate }) => {
    try {
        if (assigneeId !== undefined) {
            const userAssignee = await userRepository.getUserById(assigneeId);
            if (!userAssignee) {
                throw new AppError(
                    "User does not exist",
                    404,
                    "USER_NOT_FOUND",
                    {
                        field: "assigneeId",
                        issue: "not_found"
                    }
                );
            }
        }

        if (reporterId !== undefined) {
            const userreporter = await userRepository.getUserById(reporterId);
            if (!userreporter) {
                throw new AppError(
                    "User does not exist",
                    404,
                    "USER_NOT_FOUND",
                    {
                        field: "reporterId",
                        issue: "not_found"
                    }
                );
            }
        }

        if (priorityId !== undefined) {
            const priority = await priorityRepository.getPriorityById(priorityId);
            if (!priority) {
                throw new AppError(
                    "priority does not exist",
                    404,
                    "PRIORITY_NOT_FOUND",
                    {
                        field: "priorityId",
                        issue: "not_found"
                    }
                );
            }
        }

        const project = await taskRepository.updateTask({
            id, title, description, assigneeId, reporterId, priorityId, dueDate
        });

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateTaskStatus = async (id, { statusId }) => {
    try {
        const status = await statusRepository.getStatusById(statusId);
        if (!status) {
            throw new AppError(
                "status does not exist",
                404,
                "STATUS_NOT_FOUND",
                {
                    field: "statusId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.updateTaskStatus({ id, statusId });

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};


export const getTaskById = async (id) => {
    try {
        const task = await taskRepository.getTaskById(id);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTasksByProjectId = async (projectId) => {
    try {
        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new AppError(
                "project does not exist",
                404,
                "PROJECT_NOT_FOUND",
                {
                    field: "projectId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.getTasksByProjectId(projectId);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTasksByUserAssigneeId = async (assigneeId) => {
    try {
        const user = await userRepository.getUserById(assigneeId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "assigneeId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.getTasksByUserAssigneeId(assigneeId);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTasksByUserReporterId = async (reporterId) => {
    try {
        const user = await userRepository.getUserById(reporterId);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "reporterId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.getTasksByUserReporterId(reporterId);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTasksByStatusId = async (statusId) => {
    try {
        const status = await statusRepository.getStatusById(statusId);
        if (!status) {
            throw new AppError(
                "status does not exist",
                404,
                "STATUS_NOT_FOUND",
                {
                    field: "statusId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.getTasksByStatusId(statusId);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getTasksByPriorityId = async (priorityId) => {
    try {
        const priority = await priorityRepository.getPriorityById(priorityId);
        if (!priority) {
            throw new AppError(
                "priority does not exist",
                404,
                "PRIORITY_NOT_FOUND",
                {
                    field: "priorityId",
                    issue: "not_found"
                }
            );
        }

        const task = await taskRepository.getTasksByPriorityId(priorityId);

        return task;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};