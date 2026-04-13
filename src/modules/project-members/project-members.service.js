import * as projectMemberRepository from "./project-members.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";
import { validateProjectMemberExists } from "../../validators/project-members.validator.js";

export const getProjectMembers = async () => {
    return projectMemberRepository.getProjectMembers();
};

export const createProjectMembers = async ({ projectId, userId }) => {
    await Promise.all([
        validateProjectExists(projectId),
        validateUserExists(userId)
    ]);

    return projectMemberRepository.createProjectMembers({
        projectId,
        userId
    });
};

export const deleteProjectMemberById = async (id) => {
    const result = await projectMemberRepository.deleteProjectMemberById(id);

    return { deletedCount: result || 0 };
};

export const deleteProjectMembersByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    const result = await projectMemberRepository.deleteProjectMembersByProjectId(projectId);

    return { deletedCount: result || 0 };
};

export const deleteProjectMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const result = await projectMemberRepository.deleteProjectMembersByUserId(userId);

    return { deletedCount: result || 0 };
};

export const getProjectMemberById = async (id) => {
    return await validateProjectMemberExists(id);
};

export const getProjectMembersByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    return projectMemberRepository.getProjectMembersByProjectId(projectId);
};

export const getProjectMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    projectMemberRepository.getProjectMembersByUserId(userId);
};