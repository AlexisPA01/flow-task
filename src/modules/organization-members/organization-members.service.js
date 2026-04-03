import * as organizationMemberRepository from "./organization-members.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as organizationRepository from "../organizations/organizations.repository.js";
import * as roleRepository from "../role/role.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getOrganiationMembers = async () => {
    return await organizationMemberRepository.getOrganiationMembers();
};

export const createOrganiationMembers = async ({ organizationId, userId, roleId }) => {
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

        const role = await roleRepository.getRoleById(roleId);
        if (!role) {
            throw new AppError(
                "Role does not exist",
                404,
                "ROLE_NOT_FOUND",
                {
                    field: "roleId",
                    issue: "not_found"
                }
            );
        }

        const organizationMember = await organizationMemberRepository.createOrganiationMembers({
            organizationId,
            userId,
            roleId
        });

        return organizationMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteOrganiationMemberById = async (id) => {
    try {
        const result = await organizationMemberRepository.deleteOrganiationMemberById(id);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteOrganiationMembersByOrganizationId = async (organizationId) => {
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

        const result = await organizationMemberRepository.deleteOrganiationMembersByOrganizationId(organizationId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const deleteOrganiationMembersByUserId = async (userId) => {
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

        const result = await organizationMemberRepository.deleteOrganiationMembersByUserId(userId);

        return { deletedCount: result || 0 };
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getOrganiationMemberById = async (id) => {
    try {
        const organizationMember = await organizationMemberRepository.getOrganiationMemberById(id);

        return organizationMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getOrganiationMembersByOrganizationId = async (organizationId) => {
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

        const organizationMember = await organizationMemberRepository.getOrganiationMembersByOrganizationId(organizationId);

        return organizationMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getOrganiationMembersByUserId = async (userId) => {
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

        const organizationMember = await organizationMemberRepository.getOrganiationMembersByUserId(userId);

        return organizationMember;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};