import { z } from "zod";

export const createOrganizationSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, "Name too large"),
    ownerId: z
        .uuid("The id must be a valid uuid"),
});

export const getOrganizationById = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});