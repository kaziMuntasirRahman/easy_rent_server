import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env"), quiet: true });

const config = {
  neon_conn_str: process.env.CONNECTION_STRING,
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET,
};

export default config;
