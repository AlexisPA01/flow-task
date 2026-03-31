import { Router } from "express";
import * as labelController from "./labels.controller.js";

const router = Router();

router.get("/", labelController.getLabels);
router.post("/", labelController.createLabel);
router.put("/by-id/:id", labelController.updateLabel);
router.get("/by-id/:id", labelController.getLabelById);
router.get("/by-organization/:organizationId", labelController.getLabelsByOrganizationId);

export default router;