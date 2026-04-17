import * as activityLogRepository from "./activity-logs.repository.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateActivityLogExists } from "../../validators/activity-logs.validator.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getActivityLogs = async () => {
    const activityLogs = await activityLogRepository.getActivityLogs();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "activity_logs",
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

    return activityLogs;
};

export const createActivityLog = async ({ action, entityType, entityId, metadata, organizationId, userId }) => {
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
    const activityLog = await validateActivityLogExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "activity_logs",
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

    return activityLog;
};

export const getActivityLogsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const activityLog = await activityLogRepository.getActivityLogsByOrganizationId(organizationId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "activity_logs",
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

    return activityLog;
};

export const getActivityLogsByUserId = async (userId) => {
    await validateUserExists(userId);

    const activityLog = await activityLogRepository.getActivityLogsByUserId(userId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "activity_logs",
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

    return activityLog;
};