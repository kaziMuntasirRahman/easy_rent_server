import pool from "../../config/db";

const getAllUsers = async () =>
  await pool.query(`
   SELECT id, name, email, phone, role FROM users
   `);


export const usersServices = { getAllUsers };
