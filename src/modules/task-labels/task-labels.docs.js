import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse, deleteManyResponse } from "../../docs/helper.js";
import {
    taskLabelByPrimaryKeySchema,
    taskLabelsByTaskIdSchema,
    taskLabelsByLabelIdSchema,
    taskLabelFullSchema
} from "./task-labels.schema.js";

registry.registerPath({
    method: "get",
    path: "/task-labels",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(taskLabelFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/task-labels",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: taskLabelByPrimaryKeySchema },
            },
        },
    },
    responses: {
        201: successResponse(taskLabelFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/task-labels/by-primary-key/{taskId}/{labelId}",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: taskLabelByPrimaryKeySchema
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
    path: "/task-labels/by-task/{taskId}",
    tags: ["Task Labels"],
    security: [{ bearerAuth: [] }],
    request: {
        params: taskLabelsByTaskIdSchema
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
    path: "/task-labels/by-label/{labelId}",
    tags: ["Task Labels"],
    security: [{ bearerAuth: [] }],
    request: {
        params: taskLabelsByLabelIdSchema
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
    path: "/task-labels/by-primary-key/{taskId}/{labelId}",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskLabelByPrimaryKeySchema },
    responses: {
        200: successResponse(taskLabelFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-labels/by-task/{taskId}",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskLabelsByTaskIdSchema },
    responses: {
        200: successResponse(taskLabelFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-labels/by-label/{labelId}",
    tags: ["Task Labels"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskLabelsByLabelIdSchema },
    responses: {
        200: successResponse(taskLabelFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});