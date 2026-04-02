import { Router } from "express";
import * as projectController from "./projects.controller.js";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/", projectController.createProject);
router.put("/by-id/:id", projectController.updateProject);
router.get("/by-id/:id", projectController.getProjectById);
router.get("/by-organization/:organizationId", projectController.getProjectsByOrganizationId);
router.get("/by-user/:userId", projectController.getProjectsByUserId);

export default router;