import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    activityLogByIdSchema,
    activityLogsByOrganizationIdSchema,
    activityLogsByUserIdSchema,
    activityLogFullSchema
} from "./activity-logs.schema.js";

registry.registerPath({
    method: "get",
    path: "/activity-logs",
    tags: ["Activity Logs"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(activityLogFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/activity-logs/by-id/{id}",
    tags: ["Activity Logs"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: activityLogByIdSchema },
    responses: {
        200: successResponse(activityLogFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/activity-logs/by-organization/{organizationId}",
    tags: ["Activity Logs"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: activityLogsByOrganizationIdSchema },
    responses: {
        200: successResponse(activityLogFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/activity-logs/by-user/{userId}",
    tags: ["Activity Logs"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: activityLogsByUserIdSchema },
    responses: {
        200: successResponse(activityLogFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});