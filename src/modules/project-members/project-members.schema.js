import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createProjectMemberSchema = z.object({
    projectId: z
        .uuid("The projectId must be a valid uuid"),
    userId: z
        .uuid("The userId must be a valid uuid")
});

export const projectMemberByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const projectMembersByProjectIdSchema = z.object({
    projectId: z
        .uuid("The projectId must be a valid uuid")
});

export const projectMembersByUserIdSchema = z.object({
    userId: z
        .uuid("The userId must be a valid uuid")
});

export const projectMemberFullSchema = z.object({
    id: z.uuid(),
    joined_at: z.string().datetime(),

    project: z.object({
        id: z.uuid(),
        name: z.string(),
        key: z.string(),
        description: z.string().nullable()
    }),

    user: z.object({
        id: z.uuid(),
        email: z.email()
    })
});

registry.register("CreateProjectMember", createProjectMemberSchema);
registry.register("ProjectMemberById", projectMemberByIdSchema);
registry.register("ProjectMemberByTaskId", projectMembersByProjectIdSchema);
registry.register("ProjectMemberByUserId", projectMembersByUserIdSchema);
registry.register("ProjectMemberResponse", projectMemberFullSchema);