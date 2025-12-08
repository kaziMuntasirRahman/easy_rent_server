"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_1 = require("./auth.services");
const config_1 = __importDefault(require("../../config"));
const createUser = async (req, res) => {
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
    }
    else if (!allowedRoles.includes(role)) {
        return res.status(400).json({
            success: false,
            message: "Invalid role. Role should be 'admin' or 'customer'",
        });
    }
    try {
        const result = await auth_services_1.authServices.createUser(name, email.toLowerCase(), bcryptjs_1.default.hashSync(password, 10), phone, role?.toLowerCase());
        //  console.log(result.rows);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Credential Missing" });
    }
    try {
        const user = await auth_services_1.authServices.loginUser(email, password);
        if (!user) {
            return res.status(400).json({ success: false, message: "Login failed" });
        }
        const token = jsonwebtoken_1.default.sign(user, config_1.default.jwt_secret, { expiresIn: "5d" });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: { token, user },
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
exports.authController = { createUser, loginUser };
//# sourceMappingURL=auth.controller.js.map