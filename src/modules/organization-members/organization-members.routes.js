import { Router } from "express";
import * as organizationMembersController from "./organization-members.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(organizationMembersController.getOrganiationMembers));
router.post("/", asyncHandler(organizationMembersController.createOrganiationMembers));
router.delete("/by-id/:id", asyncHandler(organizationMembersController.deleteOrganiationMemberById));
router.delete("/by-organization/:organizationId", asyncHandler(organizationMembersController.deleteOrganiationMembersByOrganizationId));
router.delete("/by-user/:userId", asyncHandler(organizationMembersController.deleteOrganiationMembersByUserId));
router.get("/by-id/:id", asyncHandler(organizationMembersController.getOrganiationMemberById));
router.get("/by-organization/:organizationId", asyncHandler(organizationMembersController.getOrganiationMembersByOrganizationId));
router.get("/by-user/:userId", asyncHandler(organizationMembersController.getOrganiationMembersByUserId));

export default router;