import { Router } from "express"
import * as priorityController from "./priority.controller.js"

const router = Router();

router.get("/", priorityController.getPriorities);
router.post("/", priorityController.createPriority);

export default router;