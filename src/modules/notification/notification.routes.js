import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(notificationController.getNotifications));
router.post("/", authMiddleware, asyncHandler(notificationController.createNotification));
router.put("/by-id/:id", authMiddleware, asyncHandler(notificationController.updateNotificationStatus));
router.get("/by-id/:id", authMiddleware, asyncHandler(notificationController.getNotificationById));
router.get("/by-user/:userId", authMiddleware, asyncHandler(notificationController.getNotificationsByUserId));
router.get("/by-type/:typeId", authMiddleware, asyncHandler(notificationController.getNotificationsByTypeId));

export default router;