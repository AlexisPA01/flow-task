import { Router } from "express";
import * as taskController from "./tasks.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(taskController.getTasks));
router.post("/", asyncHandler(taskController.createTask));
router.put("/by-id/:id", asyncHandler(taskController.updateTask));
router.put("/status/:id", asyncHandler(taskController.updateTaskStatus));
router.get("/by-id/:id", asyncHandler(taskController.getTaskById));
router.get("/by-project/:projectId", asyncHandler(taskController.getTasksByProjectId));
router.get("/by-user-assignee/:assigneeId", asyncHandler(taskController.getTasksByUserAssigneeId));
router.get("/by-user-reporter/:reporterId", asyncHandler(taskController.getTasksByUserReporterId));
router.get("/by-status/:statusId", asyncHandler(taskController.getTasksByStatusId));
router.get("/by-priority/:priorityId", asyncHandler(taskController.getTasksByPriorityId));

export default router;