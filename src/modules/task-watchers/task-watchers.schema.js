import { z } from "zod";

export const taskWatcherByPrimaryKeySchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid"),
    userId: z
        .uuid("The userId must be a valid uuid")
});

export const taskWatchersByTaskIdSchema = z.object({
    taskId: z
        .uuid("The taskId must be a valid uuid")
});

export const taskWatchersByUserIdSchema = z.object({
    userId: z
        .uuid("The userId must be a valid uuid")
});

