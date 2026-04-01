import { Router } from "express"
import * as notificationTypeController from "./notification-type.controller.js"

const router = Router();

router.get("/", notificationTypeController.getNotificationTypes);
router.post("/", notificationTypeController.createNotificationType);

export default router;