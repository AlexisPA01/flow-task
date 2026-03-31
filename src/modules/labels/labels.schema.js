import { z } from "zod";

export const createLabelSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name of at least 3 characters")
        .max(50, "Name too large"),
    color: z
        .string()
        .trim()
        .min(3, "Color of at least 3 characters")
        .max(100, "Color too large"),
    organizationId: z.
        uuid("The id must be a valid uuid")
});

export const updateLabelSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name of at least 3 characters")
        .max(50, "Name too large")
        .optional(),
    color: z
        .string()
        .trim()
        .min(3, "Color of at least 3 characters")
        .max(100, "Color too large")
        .optional()
}).refine(
    (data) => {
        const hasName = data.name && data.name.trim() !== "";
        const hasColor = data.color && data.color.trim() !== "";
        return hasName || hasColor;
    },
    {
        message: "You must provide at least 'name' or 'color'"
    }
);

export const labelByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const labelByOrganizationIdSchema = z.object({
    organizationId: z
        .uuid("The id must be a valid uuid")
});
