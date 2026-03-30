import { Router } from "express";
import * as organizationController from "./organizations.controller.js";

const router = Router();

router.get("/", organizationController.getOrganizations);
router.post("/", organizationController.createOrganization);
router.put("/by-id/:id", organizationController.updateOrganization);
router.get("/by-id/:id", organizationController.getOrganizationById);

export default router;