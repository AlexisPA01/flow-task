import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(notificationController.getNotifications));
router.post("/", asyncHandler(notificationController.createNotification));
router.put("/by-id/:id", asyncHandler(notificationController.updateNotificationStatus));
router.get("/by-id/:id", asyncHandler(notificationController.getNotificationById));
router.get("/by-user/:userId", asyncHandler(notificationController.getNotificationsByUserId));
router.get("/by-type/:typeId", asyncHandler(notificationController.getNotificationsByTypeId));

export default router;