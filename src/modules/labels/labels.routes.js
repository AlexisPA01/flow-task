import { Router } from "express";
import * as labelController from "./labels.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(labelController.getLabels));
router.post("/", authMiddleware, asyncHandler(labelController.createLabel));
router.put("/by-id/:id", authMiddleware, asyncHandler(labelController.updateLabel));
router.get("/by-id/:id", authMiddleware, asyncHandler(labelController.getLabelById));
router.get("/by-organization/:organizationId", authMiddleware, asyncHandler(labelController.getLabelsByOrganizationId));

export default router;