import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from "../../docs/swagger.js";

extendZodWithOpenApi(z);

export const createNotificationTypeSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name of at least 3 characters")
        .max(50, "Name too large")
});

export const notificationTypeFullSchema = z.object({
    id: z.uuid(),
    anme: z.string()
});

registry.register("CreateNotificationType", createNotificationTypeSchema);
registry.register("NotificationTypeResponse", notificationTypeFullSchema);