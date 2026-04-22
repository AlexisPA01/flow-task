import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

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

export const taskHistoryFullSchema = z.object({
    id: z.uuid(),
    field: z.string(),
    old_value: z.string().nullable(),
    new_value: z.string().nullable(),
    created_at: z.string().datetime(),

    task: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable(),
        due_date: z.string().datetime().nullable()
    }),

    changer: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("TaskHistoryById", taskHistoryByIdSchema);
registry.register("TaskHistoriesByTaskId", taskHistoriesByTaskIdSchema);
registry.register("TaskHistoriesByChangedId", taskHistoriesByChangedIdSchema);
registry.register("TaskHistoryResponse", taskHistoryFullSchema);