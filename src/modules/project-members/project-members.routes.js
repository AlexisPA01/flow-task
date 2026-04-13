import { Router } from "express";
import * as projectMembersController from "./project-members.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(projectMembersController.getProjectMembers));
router.post("/", authMiddleware, asyncHandler(projectMembersController.createProjectMembers));
router.delete("/by-id/:id", authMiddleware, asyncHandler(projectMembersController.deleteProjectMemberById));
router.delete("/by-project/:projectId", authMiddleware, asyncHandler(projectMembersController.deleteProjectMembersByProjectId));
router.delete("/by-user/:userId", authMiddleware, asyncHandler(projectMembersController.deleteProjectMembersByUserId));
router.get("/by-id/:id", authMiddleware, asyncHandler(projectMembersController.getProjectMemberById));
router.get("/by-project/:projectId", authMiddleware, asyncHandler(projectMembersController.getProjectMembersByProjectId));
router.get("/by-user/:userId", authMiddleware, asyncHandler(projectMembersController.getProjectMembersByUserId));

export default router;