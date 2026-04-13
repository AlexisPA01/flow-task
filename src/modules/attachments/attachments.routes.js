import { Router } from "express";
import * as attachmentsController from "./attachments.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(attachmentsController.getAttachments));
router.post("/", authMiddleware, asyncHandler(attachmentsController.createAttachment));
router.put("/by-id/:id", authMiddleware, asyncHandler(attachmentsController.updateAttachment));
router.delete("/by-id/:id", authMiddleware, asyncHandler(attachmentsController.deleteAttachmentById));
router.get("/by-id/:id", authMiddleware, asyncHandler(attachmentsController.getAttachmentById));
router.get("/by-task/:taskId", authMiddleware, asyncHandler(attachmentsController.getAttachmentsByTaskId));
router.get("/by-uploader/:uploaderId", authMiddleware, asyncHandler(attachmentsController.getAttachmentsByUploaderId));

export default router;