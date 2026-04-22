import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse, deleteManyResponse } from "../../docs/helper.js";
import {
    createProjectMemberSchema,
    projectMemberByIdSchema,
    projectMembersByProjectIdSchema,
    projectMembersByUserIdSchema,
    projectMemberFullSchema
} from "./project-members.schema.js";

registry.registerPath({
    method: "get",
    path: "/project-members",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(projectMemberFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/project-members",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createProjectMemberSchema },
            },
        },
    },
    responses: {
        201: successResponse(projectMemberFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/project-members/by-id/{id}",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: projectMemberByIdSchema
    },
    responses: {
        200: deleteOneResponse,
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    }
});

registry.registerPath({
    method: "delete",
    path: "/project-members/by-project/{projectId}",
    tags: ["Project Members"],
    security: [{ bearerAuth: [] }],
    request: {
        params: projectMembersByProjectIdSchema
    },
    responses: {
        200: deleteManyResponse,
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    }
});

registry.registerPath({
    method: "delete",
    path: "/project-members/by-user/{userId}",
    tags: ["Project Members"],
    security: [{ bearerAuth: [] }],
    request: {
        params: projectMembersByUserIdSchema
    },
    responses: {
        200: deleteManyResponse,
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    }
});

registry.registerPath({
    method: "get",
    path: "/project-members/by-id/{id}",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectMemberByIdSchema },
    responses: {
        200: successResponse(projectMemberFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/project-members/by-project/{projectId}",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectMembersByProjectIdSchema },
    responses: {
        200: successResponse(projectMemberFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/project-members/by-user/{userId}",
    tags: ["Project Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: projectMembersByUserIdSchema },
    responses: {
        200: successResponse(projectMemberFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});