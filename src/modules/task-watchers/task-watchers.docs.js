import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse, deleteManyResponse } from "../../docs/helper.js";
import {
    taskWatcherByPrimaryKeySchema,
    taskWatchersByTaskIdSchema,
    taskWatchersByUserIdSchema,
    taskWatcherFullSchema
} from "./task-watchers.schema.js";

registry.registerPath({
    method: "get",
    path: "/task-watchers",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(taskWatcherFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/task-watchers",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: taskWatcherByPrimaryKeySchema },
            },
        },
    },
    responses: {
        201: successResponse(taskWatcherFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/task-watchers/by-primary-key/{taskId}/{userId}",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskWatcherByPrimaryKeySchema
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
    path: "/task-watchers/by-task/{taskId}",
    tags: ["Task Watchers"],
    security: [{ bearerAuth: [] }],
    request: {
        params: taskWatchersByTaskIdSchema
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
    path: "/task-watchers/by-user/{userId}",
    tags: ["Task Watchers"],
    security: [{ bearerAuth: [] }],
    request: {
        params: taskWatchersByUserIdSchema
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
    path: "/task-watchers/by-primary-key/{taskId}/{userId}",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskWatcherByPrimaryKeySchema },
    responses: {
        200: successResponse(taskWatcherFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-watchers/by-task/{taskId}",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskWatchersByTaskIdSchema },
    responses: {
        200: successResponse(taskWatcherFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-watchers/by-user/{userId}",
    tags: ["Task Watchers"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskWatchersByUserIdSchema },
    responses: {
        200: successResponse(taskWatcherFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});