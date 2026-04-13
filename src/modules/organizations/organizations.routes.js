import { Router } from "express";
import * as organizationController from "./organizations.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(organizationController.getOrganizations));
router.post("/", asyncHandler(organizationController.createOrganization));
router.put("/by-id/:id", asyncHandler(organizationController.updateOrganization));
router.get("/by-id/:id", asyncHandler(organizationController.getOrganizationById));

export default router;