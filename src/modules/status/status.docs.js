import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createStatusSchema,
    statusFullSchema
} from "./status.schema.js";

registry.registerPath({
    method: "get",
    path: "/status",
    tags: ["Status"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(statusFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/status",
    tags: ["Status"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createStatusSchema },
            },
        },
    },
    responses: {
        201: successResponse(statusFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});