import { Router } from "express"
import * as roleController from "./role.controller.js"

const router = Router();

router.get("/", roleController.getRoles);
router.post("/", roleController.createRole);

export default router;