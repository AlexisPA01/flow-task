import { email, z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createUserSchema = z.object({
    email: z
        .email("The email address must be valid")
        .trim()
        .toLowerCase()
        .max(255),
    password: z
        .string()
        .min(8, "The password must be at least 8 characters long"),
    avatarUrl: z
        .url("It must be a valid URL")
        .optional()
});

export const updateUserSchema = z.object({
    email: z
        .email("The email address must be valid")
        .trim()
        .toLowerCase()
        .max(255)
        .optional(),
    avatarUrl: z
        .url("It must be a valid URL")
        .optional()
}).refine(
    (data) => {
        const hasEmail = data.email && data.email.trim() !== "";
        const hasAvatar = data.avatarUrl && data.avatarUrl.trim() !== "";
        return hasEmail || hasAvatar;
    },
    {
        message: "You must provide at least 'email' or 'avatarUrl'"
    }
);

export const updateUserPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "The password must be at least 8 characters long")
});

export const getUserByEmailSchema = z.object({
    email: z
        .email("The email address must be valid")
        .trim()
        .toLowerCase()
        .max(255)
});

export const getManyUserStatus = z.array(
    z.object({
        id: z
            .uuid("The id must be a valid uuid"),
        isActive: z
            .boolean()
    })
).min(1);

export const getUserByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const loginSchema = z.object({
    email: z
        .email("The email address must be valid")
        .trim()
        .toLowerCase()
        .max(255),
    password: z
        .string()
        .min(8, "The password must be at least 8 characters long"),
});

export const userFullSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    password_hash: z.string(),
    avatar_url: z.string().nullable(),
    is_active: z.boolean(),
    refresh_token: z.string().nullable(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime()
});

export const authTokensSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

registry.register("CreateUser", createUserSchema);
registry.register("UpdateUser", updateUserSchema);
registry.register("UpdateUserPassword", updateUserPasswordSchema);
registry.register("GetUserByEmail", getUserByEmailSchema);
registry.register("getManyUserStatus", getManyUserStatus);
registry.register("GetUserById", getUserByIdSchema);
registry.register("Login", loginSchema);
registry.register("AuthTokens", authTokensSchema);
registry.register("UserResponse", userFullSchema);