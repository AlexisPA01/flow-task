import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse } from "../../docs/helper.js";
import {
    createTaskCommentSchema,
    updateTaskCommentSchema,
    taskCommentByIdSchema,
    taskCommentsByTaskIdSchema,
    taskCommentsByAuthorIdSchema,
    taskCommentFullSchema
} from "./task-comments.schema.js";

registry.registerPath({
    method: "get",
    path: "/task-comments",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(taskCommentFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/task-comments",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createTaskCommentSchema },
            },
        },
    },
    responses: {
        201: successResponse(taskCommentFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/task-comments/by-id/{id}",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskCommentByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateTaskCommentSchema },
            },
        },
    },
    responses: {
        200: successResponse(taskCommentFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/task-comments/by-id/{id}",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskCommentByIdSchema
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
    method: "get",
    path: "/task-comments/by-id/{id}",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskCommentByIdSchema },
    responses: {
        200: successResponse(taskCommentFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-comments/by-task/{taskId}",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskCommentsByTaskIdSchema },
    responses: {
        200: successResponse(taskCommentFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-comments/by-author/{authorId}",
    tags: ["Task Comments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskCommentsByAuthorIdSchema },
    responses: {
        200: successResponse(taskCommentFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});