import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createRoleSchema,
    roleFullSchema
} from "./role.schema.js";

registry.registerPath({
    method: "get",
    path: "/role",
    tags: ["Role"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(roleFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/role",
    tags: ["Role"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createRoleSchema },
            },
        },
    },
    responses: {
        201: successResponse(roleFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});