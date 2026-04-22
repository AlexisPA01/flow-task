import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

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

export const taskWatcherFullSchema = z.object({
    task: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable(),
        due_date: z.string().datetime().nullable()
    }),

    user: z.object({
        id: z.uuid(),
        email: z.email(),
    })
});

registry.register("TaskWatcherByPrimaryKey", taskWatcherByPrimaryKeySchema);
registry.register("TaskWatcherByTaskId", taskWatchersByTaskIdSchema);
registry.register("TaskWatcherByUserId", taskWatchersByUserIdSchema);
registry.register("TaskWatcherResponse", taskWatcherFullSchema);