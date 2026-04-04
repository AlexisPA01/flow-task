import { z } from "zod";

export const taskHistoryByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const taskHistoriesByTaskIdSchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid")
});

export const taskHistoriesByChangedIdSchema = z.object({
    changedId: z
        .uuid("The changedId must be a valid uuid")
});