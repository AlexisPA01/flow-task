import { Router } from "express"
import * as priorityController from "./priority.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(priorityController.getPriorities));
router.post("/", asyncHandler(priorityController.createPriority));

export default router;