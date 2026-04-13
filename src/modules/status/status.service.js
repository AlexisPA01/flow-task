import * as statusRepository from "./status.repository.js";

export const getStatus = async () => {
    return statusRepository.getStatus();
};

export const createStatus = async ({ name }) => {
    return statusRepository.createStatus({ name });
};