import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(4, "The name must be at least 4 characters long")
        .max(100, "The name must have a maximum of 100 characters."),
    key: z
        .string()
        .min(1, "The key must be at least 1 characters long")
        .max(6, "The name must have a maximum of 6 characters."),
    description: z
        .string()
        .min(20, "The description must be at least 20 characters long")
        .max(250, "The description must have a maximum of 250 characters."),
    organizationId: z
        .uuid("The organizationId must be a valid uuid"),
    createdBy: z
        .uuid("The createdBy must be a valid uuid")
});

export const updateProjectSchema = z.object({
    name: z
        .string()
        .min(4, "The name must be at least 4 characters long")
        .max(100, "The name must have a maximum of 100 characters.")
        .optional(),
    key: z
        .string()
        .min(1, "The key must be at least 1 characters long")
        .max(6, "The name must have a maximum of 6 characters.")
        .optional(),
    description: z
        .string()
        .min(20, "The description must be at least 20 characters long")
        .max(250, "The description must have a maximum of 250 characters.")
        .optional()
}).refine(
    (data) => {
        const hasName = data.name && data.name.trim() !== "";
        const hasKey = data.key && data.key.trim() !== "";
        const hasDescription = data.description && data.description.trim() !== "";
        return hasName || hasKey || hasDescription;
    },
    {
        message: "You must provide at least 'name', 'key' or 'description'"
    }
);

export const projectByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const projectsByOrganizationIdSchema = z.object({
    organizationId: z
        .uuid("The organizationId must be a valid uuid")
});

export const projectsByUserIdSchema = z.object({
    createdBy: z
        .uuid("The createdBy must be a valid uuid")
});

export const projectFullSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    key: z.string(),
    description: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),

    organization: z.object({
        id: z.uuid(),
        name: z.string(),
        slug: z.string()
    }),

    creator: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("CreateProject", createProjectSchema);
registry.register("UpdateProject", updateProjectSchema);
registry.register("ProjectById", projectByIdSchema);
registry.register("ProjectsByProjectId", projectsByOrganizationIdSchema);
registry.register("ProjectsByUserId", projectsByUserIdSchema);
registry.register("ProjectResponse", projectFullSchema);