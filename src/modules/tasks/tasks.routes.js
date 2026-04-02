import { Router } from "express";
import * as taskController from "./tasks.controller.js";

const router = Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/by-id/:id", taskController.updateTask);
router.put("/change-status/:id", taskController.updateTaskStatus);
router.get("/by-id/:id", taskController.getTaskById);
router.get("/by-project/:projectId", taskController.getTasksByProjectId);
router.get("/by-user-assignee/:assigneeId", taskController.getTasksByUserAssigneeId);
router.get("/by-user-reporter/:reporterId", taskController.getTasksByUserReporterId);
router.get("/by-status/:statusId", taskController.getTasksByStatusId);
router.get("/by-priority/:priorityId", taskController.getTasksByPriorityId);

export default router;