import { Router } from "express";
import * as projectMembersController from "./project-members.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(projectMembersController.getProjectMembers));
router.post("/", asyncHandler(projectMembersController.createProjectMembers));
router.delete("/by-id/:id", asyncHandler(projectMembersController.deleteProjectMemberById));
router.delete("/by-project/:projectId", asyncHandler(projectMembersController.deleteProjectMembersByProjectId));
router.delete("/by-user/:userId", asyncHandler(projectMembersController.deleteProjectMembersByUserId));
router.get("/by-id/:id", asyncHandler(projectMembersController.getProjectMemberById));
router.get("/by-project/:projectId", asyncHandler(projectMembersController.getProjectMembersByProjectId));
router.get("/by-user/:userId", asyncHandler(projectMembersController.getProjectMembersByUserId));

export default router;