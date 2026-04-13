import * as roleRepository from "./role.repository.js";

export const getRoles = async () => {
    return roleRepository.getRoles();
};

export const createRole = async ({ name }) => {
    return roleRepository.createRole({ name });
};