import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse, deleteManyResponse } from "../../docs/helper.js";
import {
    createOrganizationMemberSchema,
    organizationMemberByIdSchema,
    organizationMembersByOrganizationIdSchema,
    organizationMembersByUserIdSchema,
    organizationMemberFullSchema
} from "./organization-members.schema.js";

registry.registerPath({
    method: "get",
    path: "/organization-members",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(organizationMemberFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/organization-members",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createOrganizationMemberSchema },
            },
        },
    },
    responses: {
        201: successResponse(organizationMemberFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/organization-members/by-id/{id}",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: organizationMemberByIdSchema
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
    path: "/organization-members/by-organization/{organizationId}",
    tags: ["Organization Members"],
    security: [{ bearerAuth: [] }],
    request: {
        params: organizationMembersByOrganizationIdSchema
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
    path: "/organization-members/by-user/{userId}",
    tags: ["Organization Members"],
    security: [{ bearerAuth: [] }],
    request: {
        params: organizationMembersByUserIdSchema
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
    path: "/organization-members/by-id/{id}",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: organizationMemberByIdSchema },
    responses: {
        200: successResponse(organizationMemberFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/organization-members/by-organization/{organizationId}",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: organizationMembersByOrganizationIdSchema },
    responses: {
        200: successResponse(organizationMemberFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/organization-members/by-user/{userId}",
    tags: ["Organization Members"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: organizationMembersByUserIdSchema },
    responses: {
        200: successResponse(organizationMemberFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});