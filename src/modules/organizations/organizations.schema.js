import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createOrganizationSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, "Name too large"),
    ownerId: z
        .uuid("The ownerId must be a valid uuid")
});

export const updateOrganizationSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, "Name too large")
        .optional(),
    ownerId: z
        .uuid("The ownerId must be a valid uuid")
        .optional()
}).refine(
    (data) => {
        const hasName = data.name && data.name.trim() !== "";
        const hasOwner = data.ownerId && data.ownerId.trim() !== "";
        return hasName || hasOwner;
    },
    {
        message: "You must provide at least 'name' or 'ownerId'"
    }
);

export const organizationByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const organizationFullSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    slug: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),

    owner: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("CreateOrganization", createOrganizationSchema);
registry.register("UpdateOrganization", updateOrganizationSchema);
registry.register("OrganizationById", organizationByIdSchema);
registry.register("OrganizationResponse", organizationFullSchema);