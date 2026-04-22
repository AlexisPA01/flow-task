import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const activityLogByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const activityLogsByOrganizationIdSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid")
});

export const activityLogsByUserIdSchema = z.object({
    userId: z
        .uuid("The userId must be a valid uuid")
});

export const activityLogFullSchema = z.object({
    id: z.uuid(),
    action: z.string(),
    entity_type: z.string(),
    entity_id: z.string().nullable(),
    metadata: z.string().nullable(),
    created_at: z.string().datetime(),

    organization: z.object({
        id: z.uuid(),
        name: z.string(),
        slug: z.string()
    }).nullable(),

    user: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("ActivityLogById", activityLogByIdSchema);
registry.register("ActivityLogsByTaskId", activityLogsByOrganizationIdSchema);
registry.register("ActivityLogsByUploaderId", activityLogsByUserIdSchema);
registry.register("ActivityLogResponse", activityLogFullSchema);