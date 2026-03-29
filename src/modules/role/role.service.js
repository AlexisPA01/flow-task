import * as roleRepository from "./role.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getRoles = async () => {
    return await roleRepository.getRoles();
};

export const createRole = async ({ name }) => {
    try {
        const role = await roleRepository.createRole({ name });

        return role;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};