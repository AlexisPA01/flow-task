import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.put("/change-password/:id", userController.updatePasswordUser);
router.get("/get-user/:email", userController.getUserByEmail);
router.post("/activate-users", userController.updateManyStatusUser);
router.get("/all", userController.getUsers);

export default router;