import { z } from "zod";

export const createNotificationSchema = z.object({
    title: z
        .string()
        .min(6, "The title must be at least 6 characters long")
        .max(100, "The title must have a maximum of 100 characters."),
    message: z
        .string()
        .min(20, "The description must be at least 20 characters long")
        .max(250, "The description must have a maximum of 250 characters."),
    userId: z
        .uuid("The id must be a valid uuid"),
    typeId: z
        .int("The ud must be a valid integer")
});

export const notificationByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const notificationsByUserIdSchema = z.object({
    userId: z
        .uuid("The id must be a valid uuid")
});

export const notificationsByTypeIdSchema = z.object({
    typeId: z
        .int("The ud must be a valid integer")
});

