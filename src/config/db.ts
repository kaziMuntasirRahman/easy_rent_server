import { Pool } from "pg";
import config from ".";

const pool = new Pool({
  connectionString: config.neon_conn_str,
});

export const initDB = async () => {
  await pool.query(`
         CREATE TABLE IF NOT EXISTS users(
         id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL,
         email VARCHAR(50) NOT NULL UNIQUE,
         password TEXT NOT NULL,
         phone VARCHAR(15) NOT NULL,
         role VARCHAR(10) CHECK(role IN ('admin', 'customer'))
         )
      `);
  await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(200) NOT NULL,
      type VARCHAR(10) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(20) NOT NULL UNIQUE,
      daily_rent_price INTEGER NOT NULL,
      availability_status VARCHAR(10) CHECK (availability_status IN('available', 'booked'))
      )
      `);
  await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INTEGER NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price INTEGER NOT NULL,
      status VARCHAR(10) CHECK (status in ('active', 'cancelled', 'returned')),
      CHECK (rent_start_date <=rent_end_date)
      )
    `);
  await pool.query(`
      CREATE TABLE IF NOT EXISTS logs(
      id SERIAL PRIMARY KEY,
      method VARCHAR(10),
      base_url VARCHAR(50),
      endpoint VARCHAR(50),
      ip_address VARCHAR(200),
      user_device VARCHAR(200),
      requested_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
};

export default pool;
