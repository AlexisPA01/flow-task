import { Router } from "express";
import * as organizationMembersController from "./organization-members.controller.js";

const router = Router();

router.get("/", organizationMembersController.getOrganiationMembers);
router.post("/", organizationMembersController.createOrganiationMembers);
router.delete("/by-id/:id", organizationMembersController.deleteOrganiationMemberById);
router.delete("/by-organization/:organizationId", organizationMembersController.deleteOrganiationMembersByOrganizationId);
router.delete("/by-user/:userId", organizationMembersController.deleteOrganiationMembersByUserId);
router.get("/by-id/:id", organizationMembersController.getOrganiationMemberById);
router.get("/by-organization/:organizationId", organizationMembersController.getOrganiationMembersByOrganizationId);
router.get("/by-user/:userId", organizationMembersController.getOrganiationMembersByUserId);

export default router;