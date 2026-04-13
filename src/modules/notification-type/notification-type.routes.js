import { Router } from "express"
import * as notificationTypeController from "./notification-type.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(notificationTypeController.getNotificationTypes));
router.post("/", asyncHandler(notificationTypeController.createNotificationType));

export default router;