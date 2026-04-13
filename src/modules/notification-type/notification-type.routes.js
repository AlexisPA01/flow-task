import { Router } from "express"
import * as notificationTypeController from "./notification-type.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(notificationTypeController.getNotificationTypes));
router.post("/", authMiddleware, asyncHandler(notificationTypeController.createNotificationType));

export default router;