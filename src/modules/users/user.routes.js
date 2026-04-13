import { Router } from "express";
import * as userController from "./user.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(userController.getUsers));
router.post("/", asyncHandler(userController.createUser));
router.put("/by-id/:id", asyncHandler(userController.updateUser));
router.put("/change-password/:id", asyncHandler(userController.updatePasswordUser));
router.get("/by-email/:email", asyncHandler(userController.getUserByEmail));
router.post("/activate-users", asyncHandler(userController.updateManyStatusUser));

export default router;