import { Router } from "express";
import * as attachmentsController from "./attachments.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(attachmentsController.getAttachments));
router.post("/", asyncHandler(attachmentsController.createAttachment));
router.put("/by-id/:id", asyncHandler(attachmentsController.updateAttachment));
router.delete("/by-id/:id", asyncHandler(attachmentsController.deleteAttachmentById));
router.get("/by-id/:id", asyncHandler(attachmentsController.getAttachmentById));
router.get("/by-task/:taskId", asyncHandler(attachmentsController.getAttachmentsByTaskId));
router.get("/by-uploader/:uploaderId", asyncHandler(attachmentsController.getAttachmentsByUploaderId));

export default router;