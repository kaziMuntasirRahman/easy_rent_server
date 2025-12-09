import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", verifyToken(["admin"]), vehicleController.addVehicle);
router.get("/", verifyToken(["admin"]), vehicleController.getAllVehicles);


export const vehicleRoutes = router;
