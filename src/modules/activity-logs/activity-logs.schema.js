import { z } from "zod";

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
