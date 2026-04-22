import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

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

export const organizationMemberFullSchema = z.object({
    id: z.uuid(),
    joined_at: z.string().datetime(),

    organization: z.object({
        id: z.uuid(),
        name: z.string(),
        slug: z.string(),
    }),

    user: z.object({
        id: z.uuid(),
        email: z.email()
    }),

    role: z.object({
        id: z.int(),
        email: z.string()
    })
});

registry.register("CreateOrganizationMember", createOrganizationMemberSchema);
registry.register("OrganizationMemberById", organizationMemberByIdSchema);
registry.register("OrganizationMemberByOrganizationId", organizationMembersByOrganizationIdSchema);
registry.register("OrganizationMemberByUserId", organizationMembersByUserIdSchema);
registry.register("OrganizationMemberResponse", organizationMemberFullSchema);