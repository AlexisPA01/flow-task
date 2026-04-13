import { Router } from "express";
import * as activityLogController from "./activity-logs.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(activityLogController.getActivityLogs));
router.get("/by-id/:id", authMiddleware, asyncHandler(activityLogController.getActivityLogById));
router.get("/by-organization/:organizationId", authMiddleware, asyncHandler(activityLogController.getActivityLogsByOrganizationId));
router.get("/by-user/:userId", authMiddleware, asyncHandler(activityLogController.getActivityLogsByUserId));

export default router;