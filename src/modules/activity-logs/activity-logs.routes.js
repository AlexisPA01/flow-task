import { Router } from "express";
import * as activityLogController from "./activity-logs.controller.js";

const router = Router();

router.get("/", activityLogController.getActivityLogs);
router.get("/by-id/:id", activityLogController.getActivityLogById);
router.get("/by-organization/:organizationId", activityLogController.getActivityLogsByOrganizationId);
router.get("/by-user/:userId", activityLogController.getActivityLogsByUserId);

export default router;