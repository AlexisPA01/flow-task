import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createNotificationSchema,
    notificationByIdSchema,
    notificationsByUserIdSchema,
    notificationsByTypeIdSchema,
    notificationFullSchema
} from "./notification.schema.js";

registry.registerPath({
    method: "get",
    path: "/notification",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(notificationFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/notification",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createNotificationSchema },
            },
        },
    },
    responses: {
        201: successResponse(notificationFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/notification/by-id/{id}",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: notificationByIdSchema,
        body: {
            content: {
                "application/json": {},
            },
        },
    },
    responses: {
        200: successResponse(notificationFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/notification/by-id/{id}",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: notificationByIdSchema },
    responses: {
        200: successResponse(notificationFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/notification/by-user/{userId}",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: notificationsByUserIdSchema },
    responses: {
        200: successResponse(notificationFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/notification/by-type/{typeId}",
    tags: ["Notifications"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: notificationsByTypeIdSchema },
    responses: {
        200: successResponse(notificationFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});