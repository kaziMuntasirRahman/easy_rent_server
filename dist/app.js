"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
(0, db_1.initDB)();
app.get("/", (req, res) => {
    res.send("Hello from EasyRent Server...");
});
exports.default = app;
//# sourceMappingURL=app.js.map