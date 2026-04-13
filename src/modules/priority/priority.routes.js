import { Router } from "express"
import * as priorityController from "./priority.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(priorityController.getPriorities));
router.post("/", authMiddleware, asyncHandler(priorityController.createPriority));

export default router;