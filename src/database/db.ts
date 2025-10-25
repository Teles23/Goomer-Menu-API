import { Pool } from "pg";
import "dotenv/config";

// Certifique-se de que as variáveis de ambiente estão configuradas no seu .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export { pool };
