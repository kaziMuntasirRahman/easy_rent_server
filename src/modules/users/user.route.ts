import { Router } from "express";
import { usersController } from "./user.controller";
import { verifyToken } from "../../middlewares/verifyToken";

const router = Router();

// get all users
router.get("/", verifyToken(["admin"]), usersController.getAllUsers);

// update an user
router.put("/:userId", verifyToken(["admin", "customer"]), usersController.updateUser);

// deleter an user
router.put("/:userId", verifyToken(["admin"]), usersController.deleteUser);

export const usersRoutes = router;
