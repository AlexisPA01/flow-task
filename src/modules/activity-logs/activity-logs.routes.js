import { Router } from "express";
import * as activityController from "./activity-logs.controller.js";

const router = Router();

router.get("/", activityController);

export default router;