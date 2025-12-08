"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (name, email, password, phone, role) => await db_1.default.query(`
      INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
      `, [name, email.toLowerCase(), password, phone, role?.toLowerCase()]);
const loginUser = async (email, password) => {
    const result = await db_1.default.query(`
   SELECT * FROM users WHERE email=$1
   `, [email]);
    if (result.rowCount === 0)
        return null;
    const hashedPassword = result.rows[0].password;
    if (bcryptjs_1.default.compareSync(password, hashedPassword)) {
        const { password, ...user } = result.rows[0];
        return user;
    }
    else {
        return null;
    }
};
exports.authServices = {
    createUser,
    loginUser,
};
//# sourceMappingURL=auth.services.js.map