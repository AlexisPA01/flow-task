import { z } from "zod";

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

export const taskCommentsByAythorIdSchema = z.object({
    authorId: z
        .uuid("The authorId must be a valid uuid")
});
