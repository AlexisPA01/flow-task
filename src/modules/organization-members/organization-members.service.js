import * as organizationMemberRepository from "./organization-members.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateRoleExists } from "../../validators/role.validator.js";
import { validateOrganizationMemberExists } from "../../validators/organization-members.validator.js";

export const getOrganiationMembers = async () => {
    return organizationMemberRepository.getOrganiationMembers();
};

export const createOrganiationMembers = async ({ organizationId, userId, roleId }) => {
    await Promise.all([
        validateUserExists(userId),
        validateOrganizationExists(organizationId),
        validateRoleExists(roleId)
    ]);

    return organizationMemberRepository.createOrganiationMembers({
        organizationId,
        userId,
        roleId
    });
};

export const deleteOrganiationMemberById = async (id) => {
    const result = await organizationMemberRepository.deleteOrganiationMemberById(id);

    return { deletedCount: result || 0 };
};

export const deleteOrganiationMembersByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const result = await organizationMemberRepository.deleteOrganiationMembersByOrganizationId(organizationId);

    return { deletedCount: result || 0 };
};

export const deleteOrganiationMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    const result = await organizationMemberRepository.deleteOrganiationMembersByUserId(userId);

    return { deletedCount: result || 0 };
};

export const getOrganiationMemberById = async (id) => {
    return await validateOrganizationMemberExists(id);
};

export const getOrganiationMembersByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    return organizationMemberRepository.getOrganiationMembersByOrganizationId(organizationId);
};

export const getOrganiationMembersByUserId = async (userId) => {
    await validateUserExists(userId);

    return organizationMemberRepository.getOrganiationMembersByUserId(userId);
};