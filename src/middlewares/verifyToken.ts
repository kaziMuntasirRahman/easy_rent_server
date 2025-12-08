import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface JwtPayload {
  id: number;
  email: string;
  role: "admin" | "customer";
}

export const verifyToken =
  (allowedRoles: ("admin" | "customer")[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const token: string = authHeader.split(" ")[1] as string;
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;

      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Access denied" });
      }
      next();
    } catch (err: any) {
      return res.status(401).json({ success: false, message: err.message });
    }
  };
