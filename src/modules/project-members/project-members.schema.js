import { z } from "zod";

export const createProjectMemberSchema = z.object({
    projectId: z
        .uuid("The id must be a valid uuid"),
    userId: z
        .uuid("The id must be a valid uuid")
});

export const projectMemberByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const projectMembersByProjectIdSchema = z.object({
    projectId: z
        .uuid("The id must be a valid uuid")
});

export const projectMembersByUserIdSchema = z.object({
    userId: z
        .uuid("The id must be a valid uuid")
});

