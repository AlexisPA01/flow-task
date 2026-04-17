import * as labelRepository from "./labels.repository.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateLabelExists } from "../../validators/label.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

export const getLabels = async () => {
    const labels = await labelRepository.getLabels();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "labels",
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

    return labels;
};

export const createLabel = async ({ name, color, organizationId }) => {
    await validateOrganizationExists(organizationId);

    const label = await labelRepository.createLabel({
        name,
        color,
        organizationId
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "labels",
        entityId: label.id,
        metadata:
        {
            payload: {
                name,
                color,
                organization_id: organizationId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return label;
};

export const updateLabel = async (id, { name, color }) => {
    const existing = await validateLabelExists(id);

    const label = await labelRepository.updateLabel({
        id,
        name,
        color
    });

    const changes = {};

    if (name !== undefined && name !== existing.name) {
        changes.name = { from: existing.name, to: name };
    }

    if (color !== undefined && color !== existing.color) {
        changes.color = { from: existing.color, to: color };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "labels",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    name: existing.name,
                    color: existing.color
                },
                after: {
                    name: label.name,
                    color: label.color
                },
                changes
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return label;
};

export const getLabelById = async (id) => {
    const label = await validateLabelExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "labels",
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

    return label;
};

export const getLabelsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const label = await labelRepository.getLabelsByOrganizationId(organizationId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "labels",
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

    return label;
};