import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createTaskCommentSchema = z.object({
    content: z
        .string()
        .min(3, "The content must be at least 3 characters long")
        .max(50, "The content must have a maximum of 50 characters."),
    taskId: z
        .uuid("The taskId must be a valid uuid"),
    authorId: z
        .uuid("The authorId must be a valid uuid")
});

export const updateTaskCommentSchema = z.object({
    content: z
        .string()
        .min(10, "The content must be at least 10 characters long")
        .max(250, "The content must have a maximum of 250 characters.")
        .optional(),
    taskId: z
        .uuid("The taskId must be a valid uuid")
        .optional(),
    authorId: z
        .uuid("The authorId must be a valid uuid")
        .optional()
}).refine(
    (data) => {
        const hasContent = data.content && data.content.trim() !== "";
        const hasTaskId = data.taskId && data.taskId.trim() !== "";
        const hasAuthorId = data.authorId && data.authorId.trim() !== "";
        return hasContent || hasTaskId || hasAuthorId;
    },
    {
        message: "You must provide at least 'content', 'taskId' or 'authorId'"
    }
);

export const taskCommentByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const taskCommentsByTaskIdSchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid")
});

export const taskCommentsByAuthorIdSchema = z.object({
    authorId: z
        .uuid("The authorId must be a valid uuid")
});

export const taskCommentFullSchema = z.object({
    id: z.uuid(),
    content: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),

    task: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable(),
        due_date: z.string().datetime().nullable()
    }),

    author: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("CreateTaskComment", createTaskCommentSchema);
registry.register("UpdateTaskComment", updateTaskCommentSchema);
registry.register("TaskCommentById", taskCommentByIdSchema);
registry.register("TaskCommentsByTaskId", taskCommentsByTaskIdSchema);
registry.register("TaskCommentsByAuthorId", taskCommentsByAuthorIdSchema);
registry.register("TaskCommentResponse", taskCommentFullSchema);