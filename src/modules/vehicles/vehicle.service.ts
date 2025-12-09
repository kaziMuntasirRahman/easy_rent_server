import pool from "../../config/db";

const addVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string
) => {
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  if (result.rowCount === 0) return null;
  return result.rows[0];
};

const getAllVehicles = async () => await pool.query(`SELECT * FROM vehicles`);

export const vehicleServices = { addVehicle, getAllVehicles };
