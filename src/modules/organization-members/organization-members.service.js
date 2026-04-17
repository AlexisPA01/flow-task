import * as organizationMemberRepository from "./organization-members.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateRoleExists } from "../../validators/role.validator.js";
import { validateOrganizationMemberExists } from "../../validators/organization-members.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getOrganizationMembers = async () => {
    const organizationMembers = await organizationMemberRepository.getOrganizationMembers();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organization_members",
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

    return organizationMembers;
};

export const createOrganizationMembers = async ({ organizationId, userId, roleId }) => {
    await Promise.all([
        validateUserExists(userId),
        validateOrganizationExists(organizationId),
        validateRoleExists(roleId)
    ]);

    const organizationMember = await organizationMemberRepository.createOrganizationMembers({
        organizationId,
        userId,
        roleId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "organization_members",
        entityId: organizationMember.id,
        metadata:
        {
            payload: {
                organization_id: organizationId,
                user_id: userId,
                role_id: roleId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return organizationMember;
};

export const deleteOrganizationMemberById = async (id) => {
    const existing = await validateOrganizationMemberExists(id);

    const result = await organizationMemberRepository.deleteOrganizationMemberById(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "organization_members",
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

export const deleteOrganizationMembersByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const existingMembers = await organizationMemberRepository.getOrganizationMembersByOrganizationId(organizationId);

    const result = await organizationMemberRepository.deleteOrganizationMembersByOrganizationId(organizationId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "organization_members",
        entityId: organizationId,
        metadata:
        {
            payload: {
                deletedCount: existingMembers.length,
                deletedIds: existingMembers.map(m => m.id),
                snapshot: existingMembers.map(m => ({
                    id: m.id,
                    organization_id: m.organization.id,
                    user_id: m.user.id,
                    role_id: m.role.id
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

export const deleteOrganizationMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const existingMembers = await organizationMemberRepository.getOrganizationMembersByUserId(userId);

    const result = await organizationMemberRepository.deleteOrganizationMembersByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "DELETE",
        entityType: "organization_members",
        entityId: userId,
        metadata:
        {
            payload: {
                deletedCount: existingMembers.length,
                deletedIds: existingMembers.map(m => m.id),
                snapshot: existingMembers.map(m => ({
                    id: m.id,
                    organization_id: m.organization.id,
                    user_id: m.user.id,
                    role_id: m.role.id
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

export const getOrganizationMemberById = async (id) => {
    const organizationMember = await validateOrganizationMemberExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organization_members",
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

    return organizationMember;
};

export const getOrganizationMembersByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const organizationMember = await organizationMemberRepository.getOrganizationMembersByOrganizationId(organizationId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organization_members",
        entityId: organizationId,
        metadata:
        {
            payload: {
                filter: {
                    organization_id: organizationId
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

    return organizationMember;
};

export const getOrganizationMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const organizationMember = await organizationMemberRepository.getOrganizationMembersByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organization_members",
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

    return organizationMember;
};