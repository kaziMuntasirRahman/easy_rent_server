import pool from "../../config/db";

const getAllUsers = async () =>
  await pool.query(`
   SELECT id, name, email, phone, role FROM users
   `);

const getUserById = async (id: number) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result.rows[0];
};

const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  id: number
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET name=$1, email=$2, phone=$3, role=$4
    WHERE id=$5
    RETURNING id, name, email, phone, role
    `,
    [name, email, phone, role, id]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
};

export const usersServices = { getAllUsers, updateUser, getUserById };
