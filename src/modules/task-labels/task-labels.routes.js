import { Router } from "express";
import * as taskLabelsController from "./task-labels.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(taskLabelsController.getTaskLabels));
router.post("/", asyncHandler(taskLabelsController.createTaskLabel));
router.delete("/by-primary-key/:taskId/:labelId", asyncHandler(taskLabelsController.deleteTaskLabelByPrimaryKey));
router.delete("/by-task/:taskId", asyncHandler(taskLabelsController.deleteTaskLabelByTaskId));
router.delete("/by-label/:labelId", asyncHandler(taskLabelsController.deleteTaskLabelByLabelId));
router.get("/by-primary-key/:taskId/:labelId", asyncHandler(taskLabelsController.getTaskLabelByPrimaryKey));
router.get("/by-task/:taskId", asyncHandler(taskLabelsController.getTaskLabelByTaskId));
router.get("/by-label/:labelId", asyncHandler(taskLabelsController.getTaskLabelByLabelId));

export default router;