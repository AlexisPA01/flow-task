import * as priorityRepository from "./priority.repository.js";

export const getPriorities = async () => {
    return priorityRepository.getPriorities();
};

export const createPriority = async ({ name }) => {
    return priorityRepository.createPriority({ name });
};