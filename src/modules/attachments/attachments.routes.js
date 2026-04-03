import { Router } from "express";
import * as attachmentsController from "./attachments.controller.js";

const router = Router();

router.get("/", attachmentsController.getAttachments);
router.post("/", attachmentsController.createAttachment);
router.put("/by-id/:id", attachmentsController.updateAttachment);
router.delete("/by-id/:id", attachmentsController.deleteAttachmentById);
router.get("/by-id/:id", attachmentsController.getAttachmentById);
router.get("/by-task/:taskId", attachmentsController.getAttachmentsByTaskId);
router.get("/by-uploader/:uploaderId", attachmentsController.getAttachmentsByUploaderId);

export default router;