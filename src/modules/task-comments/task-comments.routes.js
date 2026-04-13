import { Router } from "express";
import * as taskCommentController from "./task-comments.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(taskCommentController.getTaskComments));
router.post("/", asyncHandler(taskCommentController.createTaskComment));
router.put("/by-id/:id", asyncHandler(taskCommentController.updateTaskComment));
router.delete("/by-id/:id", asyncHandler(taskCommentController.deleteTaskCommentById));
router.get("/by-id/:id", asyncHandler(taskCommentController.getTaskCommentById));
router.get("/by-task/:taskId", asyncHandler(taskCommentController.getTaskCommentsByTaskId));
router.get("/by-author/:authorId", asyncHandler(taskCommentController.getTaskCommentsByAuthorId));

export default router;