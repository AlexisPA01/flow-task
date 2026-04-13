import { Router } from "express"
import * as roleController from "./role.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(roleController.getRoles));
router.post("/", authMiddleware, asyncHandler(roleController.createRole));

export default router;