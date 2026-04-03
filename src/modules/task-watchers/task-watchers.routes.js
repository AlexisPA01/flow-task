import { Router } from "express";
import * as taskWatchersController from "./task-watchers.controller.js";

const router = Router();

router.get("/", taskWatchersController.getTaskWatchers);
router.post("/", taskWatchersController.createTaskWatcher);
router.delete("/by-primary-key/:taskId/:userId", taskWatchersController.deleteTaskWatcherByPrimaryKey);
router.delete("/by-task/:taskId", taskWatchersController.deleteTaskWatcherByTaskId);
router.delete("/by-user/:userId", taskWatchersController.deleteTaskWatcherByUserId);
router.get("/by-primary-key/:taskId/:userId", taskWatchersController.getTaskWatcherByPrimaryKey);
router.get("/by-task/:taskId", taskWatchersController.getTaskWatcherByTaskId);
router.get("/by-user/:userId", taskWatchersController.getTaskWatcherByUserId);

export default router;