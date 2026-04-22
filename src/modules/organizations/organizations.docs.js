import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createOrganizationSchema,
    updateOrganizationSchema,
    organizationByIdSchema,
    organizationFullSchema
} from "./organizations.schema.js";

registry.registerPath({
    method: "get",
    path: "/organizations",
    tags: ["Organizations"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(organizationFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/organizations",
    tags: ["Organizations"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createOrganizationSchema },
            },
        },
    },
    responses: {
        201: successResponse(organizationFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/organizations/by-id/{id}",
    tags: ["Organizations"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: organizationByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateOrganizationSchema },
            },
        },
    },
    responses: {
        200: successResponse(organizationFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/organizations/by-id/{id}",
    tags: ["Organizations"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: organizationByIdSchema },
    responses: {
        200: successResponse(organizationFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});