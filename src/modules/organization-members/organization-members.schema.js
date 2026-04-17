import { z } from "zod";

export const createOrganizationMemberSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid"),
    userId: z
        .uuid("The userId must be a valid uuid"),
    roleId: z
        .int("The roleId must be a valid integer")
});

export const organizationMemberByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const organizationMembersByOrganizationIdSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid")
});

export const organizationMembersByUserIdSchema = z.object({
    userId: z
        .uuid("The userId must be a valid uuid")
});

