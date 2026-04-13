import * as activityLogRepository from "./activity-logs.repository.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateActivityLogExists } from "../../validators/activity-logs.validator.js";

export const getActivityLogs = async () => {
    return activityLogRepository.getActivityLogs();
};

export const createProject = async ({ action, entityType, entityId, metadata, organizationId, userId }) => {
    await Promise.all([
        validateOrganizationExists(organizationId),
        validateUserExists(userId)
    ]);

    return activityLogRepository.createActivityLog({
        action,
        entityType,
        entityId,
        metadata,
        organizationId,
        userId
    });
};

export const getActivityLogById = async (id) => {
    return await validateActivityLogExists(id);
};

export const getActivityLogsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    return activityLogRepository.getActivityLogsByOrganizationId(organizationId);
};

export const getActivityLogsByUserId = async (userId) => {
    await validateUserExists(userId);

    return activityLogRepository.getActivityLogsByUserId(userId);
};