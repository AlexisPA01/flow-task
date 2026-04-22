import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

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

export const taskLabelFullSchema = z.object({
    task: z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string().nullable(),
        due_date: z.string().datetime().nullable()
    }),

    label: z.object({
        id: z.uuid(),
        name: z.string(),
        color: z.string()
    })
});

registry.register("TaskLabelByPrimaryKey", taskLabelByPrimaryKeySchema);
registry.register("TaskLabelByTaskId", taskLabelsByTaskIdSchema);
registry.register("TaskLabelByUserId", taskLabelsByLabelIdSchema);
registry.register("TaskLabelResponse", taskLabelFullSchema);