import { Router } from "express";
import * as projectController from "./projects.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(projectController.getProjects));
router.post("/", authMiddleware, asyncHandler(projectController.createProject));
router.put("/by-id/:id", authMiddleware, asyncHandler(projectController.updateProject));
router.get("/by-id/:id", authMiddleware, asyncHandler(projectController.getProjectById));
router.get("/by-organization/:organizationId", authMiddleware, asyncHandler(projectController.getProjectsByOrganizationId));
router.get("/by-user/:createdBy", authMiddleware, asyncHandler(projectController.getProjectsByUserId));

export default router;