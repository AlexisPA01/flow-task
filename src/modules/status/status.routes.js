import { Router } from "express"
import * as statusController from "./status.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(statusController.getStatus));
router.post("/", asyncHandler(statusController.createStatus));

export default router;