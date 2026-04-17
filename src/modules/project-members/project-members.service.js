import * as projectMemberRepository from "./project-members.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";
import { validateProjectMemberExists } from "../../validators/project-members.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getProjectMembers = async () => {
    const projectMembers = await projectMemberRepository.getProjectMembers();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "project_members",
        entityId: null,
        metadata:
        {
            payload: {},
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return projectMembers;
};

export const createProjectMembers = async ({ projectId, userId }) => {
    await Promise.all([
        validateProjectExists(projectId),
        validateUserExists(userId)
    ]);

    const projectMember = await projectMemberRepository.createProjectMembers({
        projectId,
        userId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "project_members",
        entityId: projectMember.id,
        metadata:
        {
            payload: {
                project_id: projectId,
                user_id: userId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return projectMember;
};

export const deleteProjectMemberById = async (id) => {
    const existing = await validateProjectMemberExists(id);

    const result = await projectMemberRepository.deleteProjectMemberById(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "project_members",
        entityId: id,
        metadata:
        {
            payload: {
                deleted: existing
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const deleteProjectMembersByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    const existingMembers = await projectMemberRepository.getProjectMembersByProjectId(projectId);

    const result = await projectMemberRepository.deleteProjectMembersByProjectId(projectId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "project_members",
        entityId: projectId,
        metadata:
        {
            payload: {
                deletedCount: existingMembers.length,
                deletedIds: existingMembers.map(m => m.id),
                snapshot: existingMembers.map(m => ({
                    id: m.id,
                    joined_at: m.joined_at,
                    project_id: m.project.id,
                    user_id: m.user.id
                }))
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const deleteProjectMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const existingMembers = await projectMemberRepository.getProjectMembersByUserId(userId);

    const result = await projectMemberRepository.deleteProjectMembersByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "project_members",
        entityId: userId,
        metadata:
        {
            payload: {
                deletedCount: existingMembers.length,
                deletedIds: existingMembers.map(m => m.id),
                snapshot: existingMembers.map(m => ({
                    id: m.id,
                    joined_at: m.joined_at,
                    project_id: m.project.id,
                    user_id: m.user.id
                }))
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return { deletedCount: result || 0 };
};

export const getProjectMemberById = async (id) => {
    const projectMember = await validateProjectMemberExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "project_members",
        entityId: id,
        metadata:
        {
            payload: {
                id
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });
};

export const getProjectMembersByProjectId = async (projectId) => {
    await validateProjectExists(projectId);

    const projectMember = await projectMemberRepository.getProjectMembersByProjectId(projectId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "project_members",
        entityId: projectId,
        metadata:
        {
            payload: {
                filter: {
                    project_id: projectId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return projectMember;
};

export const getProjectMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const projectMember = await projectMemberRepository.getProjectMembersByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "project_members",
        entityId: userId,
        metadata:
        {
            payload: {
                filter: {
                    user_id: userId
                }
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return projectMember;
};