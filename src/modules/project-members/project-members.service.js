import * as projectMemberRepository from "./project-members.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as projectRepository from "../projects/projects.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getProjectMembers = async () => {
    return await projectMemberRepository.getProjectMembers();
};

export const createProjectMembers = async ({ projectId, userId }) => {
    try {
        const user = await userRepository.getUserById(userId);
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

        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new AppError(
                "Project does not exist",
                404,
                "PROJECT_NOT_FOUND",
                {
                    field: "projectId",
                    issue: "not_found"
                }
            );
        }

        const projectMember = await projectMemberRepository.createProjectMembers({
            projectId,
            userId
        });

        return projectMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteProjectMemberById = async (id) => {
    try {
        const result = await projectMemberRepository.deleteProjectMemberById(id);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteProjectMembersByProjectId = async (projectId) => {
    try {
        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new AppError(
                "Project does not exist",
                404,
                "PROJECT_NOT_FOUND",
                {
                    field: "projectId",
                    issue: "not_found"
                }
            );
        }

        const result = await projectMemberRepository.deleteProjectMembersByProjectId(projectId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteProjectMembersByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
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

        const result = await projectMemberRepository.deleteProjectMembersByUserId(userId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectMemberById = async (id) => {
    try {
        const projectMember = await projectMemberRepository.getProjectMemberById(id);

        return projectMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectMembersByProjectId = async (projectId) => {
    try {
        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new AppError(
                "Project does not exist",
                404,
                "PROJECT_NOT_FOUND",
                {
                    field: "projectId",
                    issue: "not_found"
                }
            );
        }

        const projectMember = await projectMemberRepository.getProjectMembersByProjectId(projectId);

        return projectMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getProjectMembersByUserId = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
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

        const projectMember = await projectMemberRepository.getProjectMembersByUserId(userId);

        return projectMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};