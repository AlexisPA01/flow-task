import * as organizationRepository from "./organizations.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import * as activityLogService from "../activity-logs/activity-logs.service.js";
import { asyncLocalStorage } from "../../utils/contextHandler.js";

const generateSlug = (name) => {
    return name ? name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        : undefined;
}

export const getOrganizations = async () => {
    const organizations = await organizationRepository.getOrganizations();

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organizations",
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

    return organizations;
};

export const createOrganization = async ({ name, ownerId }) => {
    await validateUserExists(ownerId, "owner_id");

    const slug = generateSlug(name);

    const organization = await organizationRepository.createOrganization({
        name,
        slug,
        ownerId,
    });

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "CREATE",
        entityType: "organizations",
        entityId: organization.id,
        metadata:
        {
            payload: {
                name,
                slug,
                owner_id: ownerId
            },
            meta: {
                userId: store?.userId,
                timestamp: new Date().toISOString()
            }
        },
        organizationId: store?.organizationId,
        userId: store?.userId
    });

    return organization;
};

export const updateOrganization = async (id, { name, ownerId }) => {
    if (ownerId !== undefined) {
        await validateUserExists(ownerId, "owner_id");
    }

    const existing = await validateOrganizationExists(id);

    const slug = generateSlug(name);

    const organization = await organizationRepository.updateOrganization({
        id,
        name,
        slug,
        ownerId,
    });

    const changes = {};

    if (name !== undefined && name !== existing.name) {
        changes.name = { from: existing.name, to: name };
    }

    if (slug !== undefined && slug !== existing.slug) {
        changes.slug = { from: existing.slug, to: slug };
    }

    if (ownerId !== undefined && ownerId !== existing.owner.id) {
        changes.owner_id = { from: existing.owner.id, to: ownerId };
    }

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "UPDATE",
        entityType: "organizations",
        entityId: id,
        metadata:
        {
            payload: {
                before: {
                    name: existing.name,
                    slug: existing.slug,
                    owner_id: existing.owner.id
                },
                after: {
                    name: organization.name,
                    slug: organization.slug,
                    owner_id: organization.owner.id
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

    return organization;
};

export const getOrganizationById = async (id) => {
    const organization = await validateOrganizationExists(id);

    const store = asyncLocalStorage.getStore();

    await activityLogService.createActivityLog({
        action: "READ",
        entityType: "organizations",
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

    return organization;
};