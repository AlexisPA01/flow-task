import * as statusRepository from "./status.repository.js";
import { mapDatabaseError } from "../../middleware/middleware.js";

export const getStatus = async () => {
    return await statusRepository.getStatus();
};

export const createStatus = async ({ name }) => {
    try {
        const status = await statusRepository.createStatus({ name });

        return status;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};