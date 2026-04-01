import * as projectRepository from "./projects.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as organizationRepository from "../organizations/organizations.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getProjects = async () => {
    return await projectRepository.getProjects();
};

const generateKey = (key) => {
    return key ? key.toUpperCase().trim().replaceAll(" ", "") : undefined;
};

export const createProject = async ({ name, key, description, organizationId, createdBy }) => {
    try {
        const user = await userRepository.getUserById(createdBy);
        if (!user) {
            throw new AppError(
                "User does not exist",
                404,
                "USER_NOT_FOUND",
                {
                    field: "userId",
                    issue: "not_found"
                }
            );
        }

        const organization = await organizationRepository.getOrganizationById(organizationId);
        if (!organization) {
            throw new AppError(
                "Organization does not exist",
                404,
                "ORGANIZATION_NOT_FOUND",
                {
                    field: "organizationId",
                    issue: "not_found"
                }
            );
        }

        const keyFormat = generateKey(key);

        const project = await projectRepository.createProject({
            name, key: keyFormat, description, organizationId, createdBy
        });

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateProject = async (id, { name, key, description }) => {
    try {
        const keyFormat = generateKey(key);

        const project = await projectRepository.updateProject({
            id, name, key: keyFormat, description
        });

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const project = await projectRepository.getProjectById(id);

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectsByOrganizationId = async (organizationId) => {
    try {
        const organization = await organizationRepository.getOrganizationById(organizationId);
        if (!organization) {
            throw new AppError(
                "Organization does not exist",
                404,
                "ORGANIZATION_NOT_FOUND",
                {
                    field: "organizationId",
                    issue: "not_found"
                }
            );
        }

        const project = await projectRepository.getProjectsByOrganizationId(organizationId);

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectsByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError(
                "Creator does not exist",
                404,
                "CREATOR_NOT_FOUND",
                {
                    field: "createdBy",
                    issue: "not_found"
                }
            );
        }

        const project = await projectRepository.getProjectsByUserId(userId);

        return project;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};