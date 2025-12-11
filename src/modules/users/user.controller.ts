import { Request, Response } from "express";
import { usersServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, phone, role } = req.body;
    const loggedUser = req.user;

    // console.log(req.user);

    const searchedUser = await usersServices.getUserById(userId);

    // 1. check if the user with the id exist or not
    if (!searchedUser) {
      return res.status(400).json({
        success: false,
        message: `User bearing id ${userId} doesn't exist.`,
      });
    }

    //2. check if the user has permission to change role or not
    if (loggedUser?.role === "customer") {
      if (loggedUser.role !== role) {
        return res.status(403).json({
          success: false,
          message: `You don't have permission to change this data.`,
        });
      }
    }

    // 3. build role filed
    const updatedName = name ?? searchedUser.name;
    const updatedEmail = email ?? searchedUser.email;
    const updatedPhone = phone ?? searchedUser.phone;
    const updatedRole = role ?? searchedUser.role;

    // 4. update data
    const result = await usersServices.updateUser(
      updatedName,
      updatedEmail.toLowerCase(),
      updatedPhone,
      updatedRole.toLowerCase(),
      userId
    );

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update" });
    }
    // after successful update
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUser = async(req: Request, res: Response) =>{
  try {
    const userId = Number(req.params.userId)
    console.log(userId);
  } catch (err:any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export const usersController = { getAllUsers, updateUser, deleteUser };
