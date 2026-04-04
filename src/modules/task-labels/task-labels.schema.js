import { z } from "zod";

export const taskLabelByPrimaryKeySchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid"),
    labelId: z
        .uuid("The labelId must be a valid uuid")
});

export const taskLabelsByTaskIdSchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid")
});

export const taskLabelsByLabelIdSchema = z.object({
    labelId: z
        .uuid("The labelId must be a valid uuid")
});

