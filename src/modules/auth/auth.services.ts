import pool from "../../config/db";
// import  from "bcryptjs"

const createUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) =>
  await pool.query(
    `
      INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
      `,
    [name, email.toLowerCase(), password, phone, role?.toLowerCase()]
  );

export const authServices = {
  createUser,
};
