import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authServices } from "./auth.services";
import config from "../../config";

const createUser = async (req: Request, res: Response) => {
  let { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || password.length < 6)
    return res.status(400).json({ success: false, message: "Invalid input" });

  const validMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!validMail.test(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address" });

  const allowedRoles = ["admin", "customer"];
  if (!role) {
    role = "customer";
  } else if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Role should be 'admin' or 'customer'",
    });
  }
  try {
    const result = await authServices.createUser(
      name,
      email.toLowerCase(),
      bcrypt.hashSync(password, 10),
      phone,
      role?.toLowerCase()
    );
    //  console.log(result.rows);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Credential Missing" });
  }

  try {
    const user = await authServices.loginUser(email, password);
    if (!user) {
      return res.status(400).json({ success: false, message: "Login failed" });
    }

    const token = jwt.sign(user, config.jwt_secret!, { expiresIn: "5d" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, user },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const authController = { createUser, loginUser };
