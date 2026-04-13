import { Router } from "express";
import * as taskWatchersController from "./task-watchers.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(taskWatchersController.getTaskWatchers));
router.post("/", authMiddleware, asyncHandler(taskWatchersController.createTaskWatcher));
router.delete("/by-primary-key/:taskId/:userId", authMiddleware, asyncHandler(taskWatchersController.deleteTaskWatcherByPrimaryKey));
router.delete("/by-task/:taskId", authMiddleware, asyncHandler(taskWatchersController.deleteTaskWatcherByTaskId));
router.delete("/by-user/:userId", authMiddleware, asyncHandler(taskWatchersController.deleteTaskWatcherByUserId));
router.get("/by-primary-key/:taskId/:userId", authMiddleware, asyncHandler(taskWatchersController.getTaskWatcherByPrimaryKey));
router.get("/by-task/:taskId", authMiddleware, asyncHandler(taskWatchersController.getTaskWatcherByTaskId));
router.get("/by-user/:userId", authMiddleware, asyncHandler(taskWatchersController.getTaskWatcherByUserId));

export default router;