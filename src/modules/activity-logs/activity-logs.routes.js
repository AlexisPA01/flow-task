import { Router } from "express";
import * as activityLogController from "./activity-logs.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(activityLogController.getActivityLogs));
router.get("/by-id/:id", asyncHandler(activityLogController.getActivityLogById));
router.get("/by-organization/:organizationId", asyncHandler(activityLogController.getActivityLogsByOrganizationId));
router.get("/by-user/:userId", asyncHandler(activityLogController.getActivityLogsByUserId));

export default router;