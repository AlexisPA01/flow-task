import { Router } from "express";
import * as labelController from "./labels.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(labelController.getLabels));
router.post("/", asyncHandler(labelController.createLabel));
router.put("/by-id/:id", asyncHandler(labelController.updateLabel));
router.get("/by-id/:id", asyncHandler(labelController.getLabelById));
router.get("/by-organization/:organizationId", asyncHandler(labelController.getLabelsByOrganizationId));

export default router;