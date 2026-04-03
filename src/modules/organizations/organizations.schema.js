import { z } from "zod";

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

export const getOrganizationById = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});