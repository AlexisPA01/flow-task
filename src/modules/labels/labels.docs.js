import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createLabelSchema,
    updateLabelSchema,
    labelByIdSchema,
    labelByOrganizationIdSchema,
    labelFullSchema
} from "./labels.schema.js";

registry.registerPath({
    method: "get",
    path: "/labels",
    tags: ["Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(labelFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/labels",
    tags: ["Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createLabelSchema },
            },
        },
    },
    responses: {
        201: successResponse(labelFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/labels/by-id/{id}",
    tags: ["Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: labelByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateLabelSchema },
            },
        },
    },
    responses: {
        200: successResponse(labelFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/labels/by-id/{id}",
    tags: ["Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: labelByIdSchema },
    responses: {
        200: successResponse(labelFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/labels/by-organization/{organizationId}",
    tags: ["Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: labelByOrganizationIdSchema },
    responses: {
        200: successResponse(labelFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});