import * as projectRepository from "./projects.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateProjectExists } from "../../validators/project.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

const generateKey = (key) => {
    return key ? key.toUpperCase().trim().replaceAll(" ", "") : undefined;
};

export const getProjects = async () => {
    const projects = await projectRepository.getProjects();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "projects",
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

    return projects;
};

export const createProject = async ({ name, key, description, organizationId, createdBy }) => {
    await Promise.all([
        validateUserExists(createdBy, "created_by"),
        validateOrganizationExists(organizationId)
    ]);

    const keyFormat = generateKey(key);

    const project = await projectRepository.createProject({
        name, key: keyFormat, description, organizationId, createdBy
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "projects",
        entityId: project.id,
        metadata:
        {
            payload: {
                name,
                key: keyFormat,
                description,
                organization_id: organizationId,
                created_by: createdBy
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return project;
};

export const updateProject = async (id, { name, key, description }) => {
    await validateProjectExists(id);

    const existing = await validateProjectExists(id);

    const keyFormat = generateKey(key);

    const project = await projectRepository.updateProject({
        id, name, key: keyFormat, description
    });

    const changes = {};

    if (name !== undefined && name !== existing.name) {
        changes.name = { from: existing.name, to: name };
    }

    if (key !== undefined && key !== existing.key) {
        changes.key = { from: existing.key, to: key };
    }

    if (description !== undefined && description !== existing.description) {
        changes.description = { from: existing.task.id, to: description };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "projects",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    name: existing.name,
                    key: existing.key,
                    description: existing.description
                },
                after: {
                    name: project.name,
                    key: project.key,
                    description: project.description
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

    return project;
};

export const getProjectById = async (id) => {
    const project = await validateProjectExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "projects",
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

    return project;
};

export const getProjectsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    const project = await projectRepository.getProjectsByOrganizationId(organizationId);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "projects",
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

    return project;
};

export const getProjectsByUserId = async (createdBy) => {
    await validateUserExists(createdBy, "created_by");

    const project = await projectRepository.getProjectsByUserId(createdBy);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "projects",
        entityId: createdBy,
        metadata:
        {
            payload: {
                filter: {
                    created_by: createdBy
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

    return project;
};