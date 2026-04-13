import { Router } from "express";
import * as organizationMembersController from "./organization-members.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(organizationMembersController.getOrganiationMembers));
router.post("/", authMiddleware, asyncHandler(organizationMembersController.createOrganiationMembers));
router.delete("/by-id/:id", authMiddleware, asyncHandler(organizationMembersController.deleteOrganiationMemberById));
router.delete("/by-organization/:organizationId", authMiddleware, asyncHandler(organizationMembersController.deleteOrganiationMembersByOrganizationId));
router.delete("/by-user/:userId", authMiddleware, asyncHandler(organizationMembersController.deleteOrganiationMembersByUserId));
router.get("/by-id/:id", authMiddleware, asyncHandler(organizationMembersController.getOrganiationMemberById));
router.get("/by-organization/:organizationId", authMiddleware, asyncHandler(organizationMembersController.getOrganiationMembersByOrganizationId));
router.get("/by-user/:userId", authMiddleware, asyncHandler(organizationMembersController.getOrganiationMembersByUserId));

export default router;