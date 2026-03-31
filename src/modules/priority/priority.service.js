import * as priorityRepository from "./priority.repository.js";
import { mapDatabaseError } from "../../middleware/middleware.js";

export const getPriorities = async () => {
    return await priorityRepository.getPriorities();
};

export const createPriority = async ({ name }) => {
    try {
        const priority = await priorityRepository.createPriority({ name });

        return priority;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};