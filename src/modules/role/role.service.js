import * as roleRepository from "./role.repository.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getRoles = async () => {
    const roles = await roleRepository.getRoles();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "role",
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

    return roles;
};

export const createRole = async ({ name }) => {
    const role = await roleRepository.createRole({ name });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "role",
        entityId: role.id,
        metadata:
        {
            payload: {
                name
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return role;
};