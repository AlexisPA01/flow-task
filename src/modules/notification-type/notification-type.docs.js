import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createNotificationTypeSchema,
    notificationTypeFullSchema
} from "./notification-type.schema.js";

registry.registerPath({
    method: "get",
    path: "/notification-type",
    tags: ["Notification Type"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(notificationTypeFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/notification-type",
    tags: ["Notification Type"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createNotificationTypeSchema },
            },
        },
    },
    responses: {
        201: successResponse(notificationTypeFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});