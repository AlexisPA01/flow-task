import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createPrioritySchema,
    priorityFullSchema
} from "./priority.schema.js";

registry.registerPath({
    method: "get",
    path: "/priority",
    tags: ["Priority"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(priorityFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/priority",
    tags: ["Priority"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createPrioritySchema },
            },
        },
    },
    responses: {
        201: successResponse(priorityFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});