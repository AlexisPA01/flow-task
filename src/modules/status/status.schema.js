import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createStatusSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name of at least 3 characters")
        .max(50, "Name too large")
});

export const statusFullSchema = z.object({
    id: z.int(),
    anme: z.string()
});

registry.register("CreateStatus", createStatusSchema);
registry.register("StatusResponse", statusFullSchema);