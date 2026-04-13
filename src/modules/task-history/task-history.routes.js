import { Router } from "express";
import * as taskHistoryController from "./task-history.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(taskHistoryController.getTaskHistories));
router.get("/by-id/:id", authMiddleware, asyncHandler(taskHistoryController.getTaskHistoryById));
router.get("/by-task/:taskId", authMiddleware, asyncHandler(taskHistoryController.getTaskHistoriesByTaskId));
router.get("/by-changer/:changedId", authMiddleware, asyncHandler(taskHistoryController.getTaskHistoriesByChangedId));

export default router;