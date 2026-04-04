import { Router } from "express";
import * as taskLabelsController from "./task-labels.controller.js";

const router = Router();

router.get("/", taskLabelsController.getTaskLabels);
router.post("/", taskLabelsController.createTaskLabel);
router.delete("/by-primary-key/:taskId/:labelId", taskLabelsController.deleteTaskLabelByPrimaryKey);
router.delete("/by-task/:taskId", taskLabelsController.deleteTaskLabelByTaskId);
router.delete("/by-label/:labelId", taskLabelsController.deleteTaskLabelByLabelId);
router.get("/by-primary-key/:taskId/:labelId", taskLabelsController.getTaskLabelByPrimaryKey);
router.get("/by-task/:taskId", taskLabelsController.getTaskLabelByTaskId);
router.get("/by-label/:labelId", taskLabelsController.getTaskLabelByLabelId);

export default router;