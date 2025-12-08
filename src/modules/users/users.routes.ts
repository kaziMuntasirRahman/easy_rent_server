import { Router } from "express";
import { usersController } from "./users.controller";
import { verifyToken } from "../../middlewares/verifyToken";

const router = Router()

router.get('/', verifyToken(['admin']), usersController.getAllUsers)


export const usersRoutes = router;