import pool from "../../config/db";
import bcrypt from "bcryptjs";

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

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
   SELECT * FROM users WHERE email=$1
   `,
    [email]
  );
  if (result.rowCount === 0) return null;

  const hashedPassword = result.rows[0].password;

  if (bcrypt.compareSync(password, hashedPassword)) {
    const { password, ...user } = result.rows[0];
    return user;
  } else {
    return null;
  }
};

export const authServices = {
  createUser,
  loginUser,
};
