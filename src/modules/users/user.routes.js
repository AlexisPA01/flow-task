import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.put("/by-id/:id", userController.updateUser);
router.put("/change-password/:id", userController.updatePasswordUser);
router.get("/by-email/:email", userController.getUserByEmail);
router.post("/activate-users", userController.updateManyStatusUser);

export default router;