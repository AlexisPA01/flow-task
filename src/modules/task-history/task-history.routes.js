import { Router } from "express";
import * as taskHistoryController from "./task-history.controller.js";

const router = Router();

router.get("/", taskHistoryController.getTaskHistories);
router.get("/by-id/:id", taskHistoryController.getTaskHistoryById);
router.get("/by-task/:taskId", taskHistoryController.getTaskHistoriesByTaskId);
router.get("/by-changer/:changedId", taskHistoryController.getTaskHistoriesByChangedId);

export default router;