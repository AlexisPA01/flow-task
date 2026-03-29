import * as organizationRepository from "./organizations.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";
import { id } from "zod/locales";

export const getOrganizations = async () => {
    return await organizationRepository.getOrganizations();
};

const generateSlug = (name) => {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

export const createOrganization = async ({ name, ownerId }) => {
    try {
        const slug = generateSlug(name);

        const organization = await organizationRepository.createOrganization({
            name,
            slug,
            ownerId,
        });

        return organization;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateOrganization = async (id, { name, ownerId }) => {
    try {
        const slug = generateSlug(name);

        const organization = await organizationRepository.updateOrganization({
            id,
            name,
            slug,
            ownerId,
        });

        return organization;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getOrganizationById = async (id) => {
    try {
        return await organizationRepository.getOrganizationById(id);
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};