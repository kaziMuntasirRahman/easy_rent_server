"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
const pool = new pg_1.Pool({
    connectionString: _1.default.neon_conn_str,
});
const initDB = async () => {
    await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL,
         email VARCHAR(50) NOT NULL UNIQUE,
         password TEXT NOT NULL,
         phone VARCHAR(15) NOT NULL,
         role VARCHAR(10) DEFAULT 'customer'
         )
      `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(200) NOT NULL,
      type VARCHAR(5),
      registration_number INTEGER NOT NULL UNIQUE,
      daily_rent_price INTEGER NOT NULL,
      availability_status VARCHAR(10)
      )
      `);
};
exports.initDB = initDB;
exports.default = pool;
//# sourceMappingURL=db.js.map