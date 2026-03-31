import { Router } from "express"
import * as statusController from "./status.controller.js"

const router = Router();

router.get("/", statusController.getStatus);
router.post("/", statusController.createStatus);

export default router;