import { Router } from "express";
import * as taskLabelsController from "./task-labels.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(taskLabelsController.getTaskLabels));
router.post("/", authMiddleware, asyncHandler(taskLabelsController.createTaskLabel));
router.delete("/by-primary-key/:taskId/:labelId", authMiddleware, asyncHandler(taskLabelsController.deleteTaskLabelByPrimaryKey));
router.delete("/by-task/:taskId", authMiddleware, asyncHandler(taskLabelsController.deleteTaskLabelByTaskId));
router.delete("/by-label/:labelId", authMiddleware, asyncHandler(taskLabelsController.deleteTaskLabelByLabelId));
router.get("/by-primary-key/:taskId/:labelId", authMiddleware, asyncHandler(taskLabelsController.getTaskLabelByPrimaryKey));
router.get("/by-task/:taskId", authMiddleware, asyncHandler(taskLabelsController.getTaskLabelByTaskId));
router.get("/by-label/:labelId", authMiddleware, asyncHandler(taskLabelsController.getTaskLabelByLabelId));

export default router;