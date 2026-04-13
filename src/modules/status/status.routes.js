import { Router } from "express"
import * as statusController from "./status.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(statusController.getStatus));
router.post("/", authMiddleware, asyncHandler(statusController.createStatus));

export default router;