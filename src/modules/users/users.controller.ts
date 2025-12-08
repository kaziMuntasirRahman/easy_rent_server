import { Request, Response } from "express";
import { usersServices } from "./users.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    // console.log(result.rows);
    res
      .status(200)
      .json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const usersController = { getAllUsers };
