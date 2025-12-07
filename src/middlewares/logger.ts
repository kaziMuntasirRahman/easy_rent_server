import { NextFunction, Request, Response } from "express";
import pool from "../config/db";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl} has been hit...`);
  await pool.query(
    `INSERT INTO logs(method, base_url, endpoint, ip_address, user_device) VALUES($1, $2, $3, $4, $5) 
    `,
    [req.method, req.get("host"), req.url, req.ip, req.headers["user-agent"]]
  );
  next();
};

export default logger;
