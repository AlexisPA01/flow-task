import { NotFoundError } from "../errors/not-found.error.js";
import { AlreadyExists } from "../errors/already-exists.js";

export const createExistsValidator = ({ getById, entityName, fieldName }) => {
    return async (id, fieldNameDinamic) => {
        if (id == null) return;

        const entity = await getById(id);

        if (!entity) {
            throw new NotFoundError(`${fieldNameDinamic ?? entityName} not found`, {
                field: fieldNameDinamic ?? fieldName,
                value: id
            });
        }

        return entity;
    };
};

export const createAlreadyExistsValidator = ({ getById, entityName, fieldName }) => {
    return async (id, fieldNameDinamic) => {
        if (id == null) return;

        const entity = await getById(id);

        if (entity) {
            throw new AlreadyExists(`${fieldNameDinamic ?? entityName} already exixts`, {
                field: fieldNameDinamic ?? fieldName,
                value: id
            });
        }

        return entity;
    };
};