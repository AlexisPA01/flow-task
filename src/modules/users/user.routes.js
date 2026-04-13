import { Router } from "express";
import * as userController from "./user.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(userController.getUsers));
router.post("/", authMiddleware, asyncHandler(userController.createUser));
router.put("/by-id/:id", authMiddleware, asyncHandler(userController.updateUser));
router.put("/change-password/:id", authMiddleware, asyncHandler(userController.updatePasswordUser));
router.get("/by-email/:email", authMiddleware, asyncHandler(userController.getUserByEmail));
router.post("/activate-users", authMiddleware, asyncHandler(userController.updateManyStatusUser));
router.post("/log-in", asyncHandler(userController.login))

export default router;