import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.mp4', '.webm'];

export const createAttachmentSchema = z.object({
    fileUrl: z
        .url("It must be a valid URL")
        .refine((url) => {
            return allowedExtensions.some(ext => url.toLowerCase().endsWith(ext));
        }, {
            message: "URL must point to an image or video file"
        }),
    fileName: z
        .string()
        .min(3, "The fileName must be at least 3 characters long")
        .max(50, "The fileName must have a maximum of 50 characters."),
    taskId: z
        .uuid("The taskId must be a valid uuid"),
    uploaderId: z
        .uuid("The uploaderId must be a valid uuid")
});

export const updateAttachmentSchema = z.object({
    fileUrl: z
        .url("It must be a valid URL")
        .refine((url) => {
            return allowedExtensions.some(ext => url.toLowerCase().endsWith(ext));
        }, {
            message: "URL must point to an image or video file"
        })
        .optional(),
    fileName: z
        .string()
        .min(3, "The fileName must be at least 3 characters long")
        .max(50, "The fileName must have a maximum of 50 characters.")
        .optional(),
    taskId: z
        .uuid("The taskId must be a valid uuid")
        .optional(),
    uploaderId: z
        .uuid("The uploaderId must be a valid uuid")
        .optional()
}).refine(
    (data) => {
        const hasFileUrl = data.fileUrl && data.fileUrl.trim() !== "";
        const hasFileName = data.fileName && data.fileName.trim() !== "";
        const hasTaskId = data.taskId && data.taskId.trim() !== "";
        const hasUploaderId = data.uploaderId && data.uploaderId.trim() !== "";
        return hasFileUrl || hasFileName || hasTaskId || hasUploaderId;
    },
    {
        message: "You must provide at least 'fileUrl', 'fileName', 'taskId' or 'uploaderId'"
    }
);

export const attachmentByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const attachmentsByTaskIdSchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid")
});

export const attachmentsByUploaderIdSchema = z.object({
    uploaderId: z
        .uuid("The uploaderId must be a valid uuid")
});

export const attachmentFullSchema = z.object({
    id: z.uuid(),
    file_url: z.string(),
    file_name: z.string(),
    created_at: z.string().datetime(),

    task: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable(),
        due_date: z.string().datetime().nullable()
    }),

    uploader: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("CreateAttachment", createAttachmentSchema);
registry.register("UpdateAttachment", updateAttachmentSchema);
registry.register("AttachmentById", attachmentByIdSchema);
registry.register("AttachmentsByTaskId", attachmentsByTaskIdSchema);
registry.register("AttachmentsByUploaderId", attachmentsByUploaderIdSchema);
registry.register("AttachmentResponse", attachmentFullSchema);