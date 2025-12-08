"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const logger_1 = __importDefault(require("./middlewares/logger"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
(0, db_1.initDB)();
// routes
app.use("/api/v1", logger_1.default);
// auth apis
app.use("/api/v1/auth", logger_1.default, auth_routes_1.authRoutes);
// base route
app.get("/", logger_1.default, (req, res) => {
    res.send("Hello from Easy_Rent Server...!!!");
});
exports.default = app;
//# sourceMappingURL=app.js.map