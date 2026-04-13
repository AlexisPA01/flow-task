import { Router } from "express";
import * as taskWatchersController from "./task-watchers.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(taskWatchersController.getTaskWatchers));
router.post("/", asyncHandler(taskWatchersController.createTaskWatcher));
router.delete("/by-primary-key/:taskId/:userId", asyncHandler(taskWatchersController.deleteTaskWatcherByPrimaryKey));
router.delete("/by-task/:taskId", asyncHandler(taskWatchersController.deleteTaskWatcherByTaskId));
router.delete("/by-user/:userId", asyncHandler(taskWatchersController.deleteTaskWatcherByUserId));
router.get("/by-primary-key/:taskId/:userId", asyncHandler(taskWatchersController.getTaskWatcherByPrimaryKey));
router.get("/by-task/:taskId", asyncHandler(taskWatchersController.getTaskWatcherByTaskId));
router.get("/by-user/:userId", asyncHandler(taskWatchersController.getTaskWatcherByUserId));

export default router;