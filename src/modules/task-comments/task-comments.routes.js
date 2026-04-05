import { Router } from "express";
import * as taskCommentController from "./task-comments.controller.js";

const router = Router();

router.get("/", taskCommentController.getTaskComments);
router.post("/", taskCommentController.createTaskComment);
router.put("/by-id/:id", taskCommentController.updateTaskComment);
router.delete("/by-id/:id", taskCommentController.deleteTaskCommentById);
router.get("/by-id/:id", taskCommentController.getTaskCommentById);
router.get("/by-task/:taskId", taskCommentController.getTaskCommentsByTaskId);
router.get("/by-author/:authorId", taskCommentController.getTaskCommentsByAuthorId);

export default router;