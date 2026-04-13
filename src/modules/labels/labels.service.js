import * as labelRepository from "./labels.repository.js";
import { validateOrganizationExists } from "../../validators/organization.validator.js";
import { validateLabelExists } from "../../validators/label.validator.js";

export const getLabels = async () => {
    return labelRepository.getLabels();
};

export const createLabel = async ({ name, color, organizationId }) => {
    await validateOrganizationExists(organizationId);

    return labelRepository.createLabel({
        name,
        color,
        organizationId
    });
};

export const updateLabel = async (id, { name, color }) => {
    await validateLabelExists(id);

    return labelRepository.updateLabel({
        id,
        name,
        color
    });
};

export const getLabelById = async (id) => {
    return await validateLabelExists(id);
};

export const getLabelsByOrganizationId = async (organizationId) => {
    await validateOrganizationExists(organizationId);

    return labelRepository.getLabelsByOrganizationId(organizationId);
};