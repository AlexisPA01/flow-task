import { Router } from "express";
import * as projectMembersController from "./project-members.controller.js";

const router = Router();

router.get("/", projectMembersController.getProjectMembers);
router.post("/", projectMembersController.createProjectMembers);
router.delete("/by-id/:id", projectMembersController.deleteProjectMemberById);
router.delete("/by-project/:projectId", projectMembersController.deleteProjectMembersByProjectId);
router.delete("/by-user/:userId", projectMembersController.deleteProjectMembersByUserId);
router.get("/by-id/:id", projectMembersController.getProjectMemberById);
router.get("/by-project/:projectId", projectMembersController.getProjectMembersByProjectId);
router.get("/by-user/:userId", projectMembersController.getProjectMembersByUserId);

export default router;