import * as organizationRepository from "./organizations.repository.js";
import { validateUserExists } from "../../validators/user.validator.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";

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
    return organizationRepository.getOrganizations();
};

export const createOrganization = async ({ name, ownerId }) => {
    await validateUserExists(ownerId, "owner_id");

    const slug = generateSlug(name);

    return organizationRepository.createOrganization({
        name,
        slug,
        ownerId,
    });
};

export const updateOrganization = async (id, { name, ownerId }) => {
    if (ownerId !== undefined) {
        await validateUserExists(ownerId, "owner_id");
    }

    await validateOrganizationExists(id);

    const slug = generateSlug(name);

    return organizationRepository.updateOrganization({
        id,
        name,
        slug,
        ownerId,
    });
};

export const getOrganizationById = async (id) => {
    return await validateOrganizationExists(id);
};