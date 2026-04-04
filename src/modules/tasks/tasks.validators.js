import * as userRepository from "../users/user.repository.js";
import * as projectRepository from "../projects/projects.repository.js";
import * as priorityRepository from "../priority/priority.repository.js";
import * as statusRepository from "../status/status.repository.js";

export const validateUser = async (userId, field) => {
    if (userId === undefined) return;

    const user = await userRepository.getUserById(userId);

    if (!user) {
        throw new AppError("User does not exist", 404, "USER_NOT_FOUND", {
            field,
            issue: "not_found"
        });
    }
};

export const validatePriority = async (priorityId) => {
    if (priorityId === undefined) return;

    const priority = await priorityRepository.getPriorityById(priorityId);

    if (!priority) {
        throw new AppError("Priority does not exist", 404, "PRIORITY_NOT_FOUND", {
            field: "priorityId",
            issue: "not_found"
        });
    }
};

export const validateStatus = async (statusId) => {
    const status = await statusRepository.getStatusById(statusId);

    if (!status) {
        throw new AppError("Status does not exist", 404, "STATUS_NOT_FOUND", {
            field: "statusId",
            issue: "not_found"
        });
    }
};