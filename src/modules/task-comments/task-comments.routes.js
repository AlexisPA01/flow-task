import { Router } from "express";
import * as taskCommentController from "./task-comments.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(taskCommentController.getTaskComments));
router.post("/", authMiddleware, asyncHandler(taskCommentController.createTaskComment));
router.put("/by-id/:id", authMiddleware, asyncHandler(taskCommentController.updateTaskComment));
router.delete("/by-id/:id", authMiddleware, asyncHandler(taskCommentController.deleteTaskCommentById));
router.get("/by-id/:id", authMiddleware, asyncHandler(taskCommentController.getTaskCommentById));
router.get("/by-task/:taskId", authMiddleware, asyncHandler(taskCommentController.getTaskCommentsByTaskId));
router.get("/by-author/:authorId", authMiddleware, asyncHandler(taskCommentController.getTaskCommentsByAuthorId));

export default router;