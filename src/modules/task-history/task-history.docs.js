import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse, deleteManyResponse } from "../../docs/helper.js";
import {
    taskHistoryByIdSchema,
    taskHistoriesByTaskIdSchema,
    taskHistoriesByChangedIdSchema,
    taskHistoryFullSchema
} from "./task-history.schema.js";

registry.registerPath({
    method: "get",
    path: "/task-history",
    tags: ["Task History"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(taskHistoryFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-history/by-id/{id}",
    tags: ["Task History"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskHistoryByIdSchema },
    responses: {
        200: successResponse(taskHistoryFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-history/by-task/{taskId}",
    tags: ["Task History"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskHistoriesByTaskIdSchema },
    responses: {
        200: successResponse(taskHistoryFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/task-history/by-changer/{changedId}",
    tags: ["Task History"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: taskHistoriesByChangedIdSchema },
    responses: {
        200: successResponse(taskHistoryFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});