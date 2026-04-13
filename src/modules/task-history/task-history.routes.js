import { Router } from "express";
import * as taskHistoryController from "./task-history.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(taskHistoryController.getTaskHistories));
router.get("/by-id/:id", asyncHandler(taskHistoryController.getTaskHistoryById));
router.get("/by-task/:taskId", asyncHandler(taskHistoryController.getTaskHistoriesByTaskId));
router.get("/by-changer/:changedId", asyncHandler(taskHistoryController.getTaskHistoriesByChangedId));

export default router;