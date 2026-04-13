import { Router } from "express";
import * as organizationController from "./organizations.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(organizationController.getOrganizations));
router.post("/", authMiddleware, asyncHandler(organizationController.createOrganization));
router.put("/by-id/:id", authMiddleware, asyncHandler(organizationController.updateOrganization));
router.get("/by-id/:id", authMiddleware, asyncHandler(organizationController.getOrganizationById));

export default router;