import * as organizationRepository from "./organizations.repository.js";
import * as userRepository from "../users/user.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getOrganizations = async () => {
    return await organizationRepository.getOrganizations();
};

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

export const createOrganization = async ({ name, ownerId }) => {
    try {
        const owner = await userRepository.getUserById(ownerId);
        if (!owner) {
            throw new AppError(
                "Owner does not exist",
                404,
                "OWNER_NOT_FOUND",
                {
                    field: "ownerId",
                    issue: "not_found"
                }
            );
        }

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
        const owner = await userRepository.getUserById(ownerId);
        if (ownerId !== undefined) {
            if (!owner) {
                throw new AppError(
                    "Owner does not exist",
                    404,
                    "OWNER_NOT_FOUND",
                    {
                        field: "ownerId",
                        issue: "not_found"
                    }
                );
            }
        }

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