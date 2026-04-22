import { z } from "zod";
import { registry } from "../../docs/swagger.js";
import { successResponse, errorResponse, deleteOneResponse } from "../../docs/helper.js";
import {
    createAttachmentSchema,
    updateAttachmentSchema,
    attachmentByIdSchema,
    attachmentsByTaskIdSchema,
    attachmentsByUploaderIdSchema,
    attachmentFullSchema
} from "./attachments.schema.js";

registry.registerPath({
    method: "get",
    path: "/attachments",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    responses: {
        200: successResponse(z.array(attachmentFullSchema)),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "post",
    path: "/attachments",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        body: {
            content: {
                "application/json": { schema: createAttachmentSchema },
            },
        },
    },
    responses: {
        201: successResponse(attachmentFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "put",
    path: "/attachments/by-id/{id}",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: attachmentByIdSchema,
        body: {
            content: {
                "application/json": { schema: updateAttachmentSchema },
            },
        },
    },
    responses: {
        200: successResponse(attachmentFullSchema),
        400: errorResponse("BAD_REQUEST"),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "delete",
    path: "/attachments/by-id/{id}",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: {
        params: attachmentByIdSchema
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
    method: "get",
    path: "/attachments/by-id/{id}",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: attachmentByIdSchema },
    responses: {
        200: successResponse(attachmentFullSchema),
        404: errorResponse("NOT_FOUND"),
        401: errorResponse("UNAUTHORIZED"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/attachments/by-task/{taskId}",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: attachmentsByTaskIdSchema },
    responses: {
        200: successResponse(attachmentFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});

registry.registerPath({
    method: "get",
    path: "/attachments/by-uploader/{uploaderId}",
    tags: ["Attachments"],
    security: [
        { bearerAuth: [], refreshToken: [] }
    ],
    request: { params: attachmentsByUploaderIdSchema },
    responses: {
        200: successResponse(attachmentFullSchema),
        401: errorResponse("UNAUTHORIZED"),
        404: errorResponse("NOT_FOUND"),
        500: errorResponse("INTERNAL_ERROR")
    },
});