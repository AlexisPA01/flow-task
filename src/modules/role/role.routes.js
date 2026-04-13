import { Router } from "express"
import * as roleController from "./role.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(roleController.getRoles));
router.post("/", asyncHandler(roleController.createRole));

export default router;