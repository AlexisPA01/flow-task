import * as projectRepository from "./projects.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";

const generateKey = (key) => {
    return key ? key.toUpperCase().trim().replaceAll(" ", "") : undefined;
};

export const getProjects = async () => {
    return projectRepository.getProjects();
};

export const createProject = async ({ name, key, description, organizationId, createdBy }) => {
    await Promise.all([
        validateUserExists(createdBy, "created_by"),
        validateOrganizationExists(organizationId)
    ]);

    const keyFormat = generateKey(key);

    return projectRepository.createProject({
        name, key: keyFormat, description, organizationId, createdBy
    });
};

export const updateProject = async (id, { name, key, description }) => {
    await validateProjectExists(id);

    const keyFormat = generateKey(key);

    return projectRepository.updateProject({
        id, name, key: keyFormat, description
    });

};

export const getProjectById = async (id) => {
    return await validateProjectExists(id);
};

export const getProjectsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    return projectRepository.getProjectsByOrganizationId(organizationId);
};

export const getProjectsByUserId = async (createdBy) => {
    await validateUserExists(createdBy, "created_by");

    return projectRepository.getProjectsByUserId(createdBy);
};