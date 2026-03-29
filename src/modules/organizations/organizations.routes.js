import { Router } from "express";
import * as organizationController from "./organizations.controller.js";

const router = Router();

router.get("/all", organizationController.getOrganizations);
router.post("/create-organization", organizationController.createOrganization);
router.put("/update-organization/:id", organizationController.updateOrganization);
router.get("/get-organization/:id", organizationController.getOrganizationById)

export default router;