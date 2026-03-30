import { z } from "zod";

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
        .max(255),
    avatarUrl: z
        .url("It must be a valid URL")
        .optional()
});

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