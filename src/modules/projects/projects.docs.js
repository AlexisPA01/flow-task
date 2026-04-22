import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createProjectSchema,
    updateProjectSchema,
    projectByIdSchema,
    projectsByOrganizationIdSchema,
    projectsByUserIdSchema,
    projectFullSchema
} from "./projects.schema.js";

registry.registerPath({
    method: "get",
    path: "/projects",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(projectFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/projects",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createProjectSchema },
            },
        },
    },
    responses: {
        201: successResponse(projectFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/projects/by-id/{id}",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: projectByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateProjectSchema },
            },
        },
    },
    responses: {
        200: successResponse(projectFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/projects/by-id/{id}",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectByIdSchema },
    responses: {
        200: successResponse(projectFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/projects/by-organization/{organizationId}",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectsByOrganizationIdSchema },
    responses: {
        200: successResponse(projectFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/projects/by-user/{createdBy}",
    tags: ["Projects"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectsByUserIdSchema },
    responses: {
        200: successResponse(projectFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});