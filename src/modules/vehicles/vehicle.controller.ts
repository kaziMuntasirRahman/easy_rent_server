import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const addVehicle = async (req: Request, res: Response) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const result = await vehicleServices.addVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to add vehicles" });
    }

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();
    if (result.rowCount === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Vehicles found", data: [] });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getVehicleById = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId);

    const result = await vehicleServices.getVehicleById(vehicleId);
    if (result.rowCount === 0) {
      return res.status(200).json({
        success: true,
        message: `Vehicle bearing id ${vehicleId} doesn't exist.`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const vehicleController = { addVehicle, getAllVehicles, getVehicleById };
