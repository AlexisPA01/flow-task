import { Router } from "express"
import * as roleController from "./role.controller.js"

const router = Router();

router.get("/all", roleController.getRoles);
router.post("/create-role", roleController.createRole);

export default router;