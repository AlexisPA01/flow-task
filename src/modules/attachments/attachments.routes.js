import { Router } from "express";
import * as attachmentsController from "./attachments.controller.js";

const router = Router();

router.get("/", attachmentsController);

export default router;