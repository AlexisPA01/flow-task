import { Router } from "express";
import * as notificationController from "./notification.controller.js";

const router = Router();

router.get("/", notificationController.getNotifications);
router.post("/", notificationController.createNotification);
router.put("/by-id/:id", notificationController.updateNotificationStatus);
router.get("/by-id/:id", notificationController.getNotificationById);
router.get("/by-user/:userId", notificationController.getNotificationsByUserId);
router.get("/by-type/:typeId", notificationController.getNotificationsByTypeId);

export default router;