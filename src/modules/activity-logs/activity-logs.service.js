import * as activityLogRepository from "./activity-logs.repository.js";
import * as userRepository from "../users/user.repository.js";
import * as organizationRepository from "../organizations/organizations.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getActivityLogs = async () => {
    return await activityLogRepository.getActivityLogs();
};

export const createProject = async ({ action, entityType, entityId, metadata, organizationId, userId }) => {
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

        const activityLog = await activityLogRepository.createActivityLog({
            action,
            entityType,
            entityId,
            metadata,
            organizationId,
            userId
        });

        return activityLog;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getActivityLogById = async (id) => {
    try {
        const activityLog = await activityLogRepository.getActivityLogById(id);

        return activityLog;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getActivityLogsByOrganizationId = async (organizationId) => {
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

        const activityLogs = await activityLogRepository.getActivityLogsByOrganizationId(organizationId);

        return activityLogs;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getActivityLogsByUserId = async (userId) => {
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

        const activityLog = await activityLogRepository.getActivityLogsByUserId(userId);

        return activityLog;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};