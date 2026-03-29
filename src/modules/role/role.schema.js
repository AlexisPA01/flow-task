import { z } from "zod";

export const createRoleSchema = z.object({
    name: z
        .string()
        .trim()
        .max(50, "Name too large")
});