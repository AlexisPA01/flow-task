import { Router } from "express";
import * as taskController from "./tasks.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(taskController.getTasks));
router.post("/", authMiddleware, asyncHandler(taskController.createTask));
router.put("/by-id/:id", authMiddleware, asyncHandler(taskController.updateTask));
router.put("/status/:id", authMiddleware, asyncHandler(taskController.updateTaskStatus));
router.get("/by-id/:id", authMiddleware, asyncHandler(taskController.getTaskById));
router.get("/by-project/:projectId", authMiddleware, asyncHandler(taskController.getTasksByProjectId));
router.get("/by-user-assignee/:assigneeId", authMiddleware, asyncHandler(taskController.getTasksByUserAssigneeId));
router.get("/by-user-reporter/:reporterId", authMiddleware, asyncHandler(taskController.getTasksByUserReporterId));
router.get("/by-status/:statusId", authMiddleware, asyncHandler(taskController.getTasksByStatusId));
router.get("/by-priority/:priorityId", authMiddleware, asyncHandler(taskController.getTasksByPriorityId));

export default router;