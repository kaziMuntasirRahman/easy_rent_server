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

const deleteUser = async (userId: number) => {
  const existedUser = await getUserById(userId);
  if (!existedUser)
    throw new Error(`User bearing id: ${userId} doesn't exist.`);

  const active = await pool.query(
    `
    SELECT * FROM bookings
    WHERE customer_id = $1
      AND rent_end_date >= CURRENT_DATE
    `,
    [userId]
  );

  if (active.rowCount! > 0) {
    throw new Error("User has active bookings. Cannot delete.");
  }

  const result = await pool.query(
    `
      DELETE FROM users WHERE id=$1
    `,
    [userId]
  );
  if (!result) throw new Error("Failed to delete.");
  return true;
};

export const usersServices = {
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
};
