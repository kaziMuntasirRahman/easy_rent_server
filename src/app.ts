import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import logger from "./middlewares/logger";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();

// middlewares
app.use(express.json());

initDB();

// routes
app.use("/api/v1", logger);

// auth apis
app.use("/api/v1/auth", logger, authRoutes);

// base route
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello from Easy_Rent Server...!!!");
});

export default app;
