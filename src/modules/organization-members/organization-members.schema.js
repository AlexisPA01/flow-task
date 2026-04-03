import { z } from "zod";

export const createOrganizationMemberSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid"),
    userId: z
        .uuid("The userId must be a valid uuid"),
    roleId: z
        .int("The roleId must be a valid integer")
});

export const organiationMemberByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const organiationMembersByOrganizationIdSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid")
});

export const organiationMembersByUserIdSchema = z.object({
    userId: z
        .uuid("The userId must be a valid uuid")
});

