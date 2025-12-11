import app from "./app";
import config from "./config";
import pool from "./config/db";

const port = config.port;

import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  await pool.query(`
    UPDATE vehicles 
    SET availability_status='available'
    WHERE id IN (
      SELECT vehicle_id FROM bookings
      WHERE rent_end_date < CURRENT_DATE
    );
  `);

  console.log("Daily check done");
});

app.listen(port, () => {
  console.log(`EasyRent server is running in the port no ${port}`);
});
