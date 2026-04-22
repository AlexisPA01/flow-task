import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createTaskSchema,
    updateTaskSchema,
    updateTaskStatusSchema,
    taskByIdSchema,
    tasksByProjectIdSchema,
    tasksByUserAssigneeIdSchema,
    tasksByUserReporterIdSchema,
    tasksByStatusIdSchema,
    tasksByPriorityIdSchema,
    taskFullSchema
} from "./tasks.schema.js";

registry.registerPath({
    method: "get",
    path: "/tasks",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(taskFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/tasks",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createTaskSchema },
            },
        },
    },
    responses: {
        201: successResponse(taskFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/tasks/by-id/{id}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateTaskSchema },
            },
        },
    },
    responses: {
        200: successResponse(taskFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/tasks/status/{id}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateTaskStatusSchema },
            },
        },
    },
    responses: {
        200: successResponse(taskFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-id/{id}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskByIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-project/{projectId}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: tasksByProjectIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-user-assignee/{assigneeId}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: tasksByUserAssigneeIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-user-reporter/{reporterId}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: tasksByUserReporterIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-status/{statusId}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: tasksByStatusIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/tasks/by-priority/{priorityId}",
    tags: ["Tasks"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: tasksByPriorityIdSchema },
    responses: {
        200: successResponse(taskFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});