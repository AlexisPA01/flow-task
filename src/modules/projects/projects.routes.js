import { Router } from "express";
import * as projectController from "./projects.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(projectController.getProjects));
router.post("/", asyncHandler(projectController.createProject));
router.put("/by-id/:id", asyncHandler(projectController.updateProject));
router.get("/by-id/:id", asyncHandler(projectController.getProjectById));
router.get("/by-organization/:organizationId", asyncHandler(projectController.getProjectsByOrganizationId));
router.get("/by-user/:createdBy", asyncHandler(projectController.getProjectsByUserId));

export default router;