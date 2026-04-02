import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(4, "The title must be at least 4 characters long")
        .max(100, "The title must have a maximum of 100 characters."),
    description: z
        .string()
        .min(20, "The description must be at least 20 characters long")
        .max(250, "The description must have a maximum of 250 characters.")
        .optional(),
    projectId: z
        .uuid("The projectId must be a valid uuid"),
    assigneeId: z
        .uuid("The assignneId must be a valid uuid")
        .optional(),
    reporterId: z
        .uuid("The reporterId must be a valid uuid"),
    priorityId: z
        .int("The priorityId must be a valid integer"),
    dueDate: z
        .coerce.date("The dueDate must be a valid date")
});

export const updateTaskSchema = z.object({
    title: z
        .string()
        .min(4, "The title must be at least 4 characters long")
        .max(100, "The title must have a maximum of 100 characters.")
        .optional(),
    description: z
        .string()
        .min(20, "The description must be at least 20 characters long")
        .max(250, "The description must have a maximum of 250 characters.")
        .optional(),
    assigneeId: z
        .uuid("The assignneId must be a valid uuid")
        .optional(),
    reporterId: z
        .uuid("The reporterId must be a valid uuid")
        .optional(),
    priorityId: z
        .int("The priorityId must be a valid integer")
        .optional(),
    dueDate: z
        .coerce.date("The dueDate must be a valid date")
        .optional()
}).refine(
    (data) => {
        const hasTitle = data.title && data.title.trim() !== "";
        const hasDescription = data.description && data.description.trim() !== "";
        const hasAssignneId = data.assignneId && data.assignneId.trim() !== "";
        const hasReporterId = data.reporterId && data.reporterId.trim() !== "";
        const hasPriorityId = data.priorityId && data.priorityId.toString().trim() !== "";
        const hasDueDate = data.dueDate && data.dueDate.toISOString().trim() !== "";
        return hasTitle || hasDescription || hasAssignneId || hasReporterId || hasPriorityId || hasDueDate;
    },
    {
        message: "You must provide at least 'name', 'description', 'assigneeId', 'reporterId', 'priorityId' or 'dueDate'"
    }
);

export const updateTaskStatusSchema = z.object({
    statusId: z
        .int("The statusId must be a valid integer")
});

export const taskByIdSchema = z.object({
    id: z
        .uuid("The id must be a valid uuid")
});

export const tasksByProjectIdSchema = z.object({
    projectId: z
        .uuid("The projectId must be a valid uuid")
});

export const tasksByUserAssigneeIdSchema = z.object({
    assigneeId: z
        .uuid("The id must be a valid uuid")
});

export const tasksByUserReporterIdSchema = z.object({
    reporterId: z
        .uuid("The id must be a valid uuid")
});

export const tasksByStatusIdSchema = z.object({
    statusId: z
        .coerce.number()
        .int("The statusId must be a valid integer")
});

export const tasksByPriorityIdSchema = z.object({
    priorityId: z
        .coerce.number()
        .int("The statusId must be a valid integer")
});