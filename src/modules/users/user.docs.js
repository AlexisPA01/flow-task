import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse } from "../../docs/helper.js";
import {
    createUserSchema,
    updateUserSchema,
    updateUserPasswordSchema,
    getUserByEmailSchema,
    getManyUserStatus,
    getUserByIdSchema,
    loginSchema,
    authTokensSchema,
    userFullSchema
} from "./user.schema.js";

registry.registerPath({
    method: "get",
    path: "/users",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(userFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/users",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createUserSchema },
            },
        },
    },
    responses: {
        201: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "put",
    path: "/users/by-id/{id}",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: getUserByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateUserSchema },
            },
        },
    },
    responses: {
        200: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "put",
    path: "/users/change-password/{id}",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: getUserByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateUserPasswordSchema },
            },
        },
    },
    responses: {
        200: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "get",
    path: "/users/by-email/{email}",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: getUserByEmailSchema },
    responses: {
        200: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "get",
    path: "/users/by-id/{id}",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: getUserByIdSchema },
    responses: {
        200: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/users/activate-users",
    tags: ["Users"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: getManyUserStatus },
            },
        },
    },
    responses: {
        200: successResponse(userFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});

registry.registerPath({
    method: "post",
    path: "/users/log-in",
    tags: ["Users"],
    security: [],
    request: {
        body: {
            content: {
                "application/json": { schema: loginSchema },
            },
        },
    },
    responses: {
        201: successResponse(authTokensSchema),
        400: errorResponse("BAD_REQUEST"),
        500: errorResponse("INTERNAL_ERROR"),
    },
});