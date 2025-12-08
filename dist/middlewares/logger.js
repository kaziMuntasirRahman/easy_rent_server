"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const logger = async (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} has been hit...`);
    await db_1.default.query(`INSERT INTO logs(method, base_url, endpoint, ip_address, user_device) VALUES($1, $2, $3, $4, $5) 
    `, [req.method, req.get("host"), req.url, req.ip, req.headers["user-agent"]]);
    next();
};
exports.default = logger;
//# sourceMappingURL=logger.js.map