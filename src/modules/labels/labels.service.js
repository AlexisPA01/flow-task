import * as labelRepository from "./labels.repository.js";
import * as organizationRepository from "../organizations/organizations.repository.js";
import { AppError, mapDatabaseError } from "../../middleware/middleware.js";

export const getLabels = async () => {
    return await labelRepository.getLabels();
};

export const createLabel = async ({ name, color, organizationId }) => {
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

        const label = await labelRepository.createLabel({
            name,
            color,
            organizationId
        });

        return label;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const updateLabel = async (id, { name, color }) => {
    try {
        const label = await labelRepository.updateLabel({
            id,
            name,
            color
        });

        return label;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getLabelById = async (id) => {
    try {
        return await labelRepository.getLabelById(id);
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};

export const getLabelsByOrganizationId = async (organizationId) => {
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

        const label = await labelRepository.getLabelsByOrganizationId(organizationId);

        return label;
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        if (mappedError) throw mappedError;

        throw error;
    }
};