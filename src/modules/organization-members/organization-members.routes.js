import { Router } from "express";
import * as organizationMembersController from "./organization-members.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(organizationMembersController.getOrganizationMembers));
router.post("/", authMiddleware, asyncHandler(organizationMembersController.createOrganizationMembers));
router.delete("/by-id/:id", authMiddleware, asyncHandler(organizationMembersController.deleteOrganizationMemberById));
router.delete("/by-organization/:organizationId", authMiddleware, asyncHandler(organizationMembersController.deleteOrganizationMembersByOrganizationId));
router.delete("/by-user/:userId", authMiddleware, asyncHandler(organizationMembersController.deleteOrganizationMembersByUserId));
router.get("/by-id/:id", authMiddleware, asyncHandler(organizationMembersController.getOrganizationMemberById));
router.get("/by-organization/:organizationId", authMiddleware, asyncHandler(organizationMembersController.getOrganizationMembersByOrganizationId));
router.get("/by-user/:userId", authMiddleware, asyncHandler(organizationMembersController.getOrganizationMembersByUserId));

export default router;