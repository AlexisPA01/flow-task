import { z } from "zod";

export const successResponse = (schema) => ({
    description: "Success",
    content: {
        "application/json": {
            schema: z.object({
                success: z.boolean(),
                message: z.string(),
                data: schema,
            }),
        },
    },
});

export const errorResponse = (code) => ({
    description: "Error",
    content: {
        "application/json": {
            schema: z.object({
                success: z.literal(false),
                error: z.object({
                    code: z.literal(code),
                    message: z.string(),
                    details: z.record(z.any()).nullable(),
                }),
            }),
        },
    },
});

export const deleteOneResponse = {
    description: "Deleted successfully",
    content: {
        "application/json": {
            schema: z.object({
                success: z.literal(true),
                message: z.string(),
                data: z.literal(true)
            })
        },
    },
};

export const deleteManyResponse = {
    description: "Deleted successfully",
    content: {
        "application/json": {
            schema: z.object({
                success: z.literal(true),
                message: z.string(),
                data: z.number()
            })
        },
    },
};