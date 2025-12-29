import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

// Schemas import
import * as schema from "./schema";

dotenv.config();

// ------------------------
// PostgreSQL Pool
// ------------------------
const pool = new Pool({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

// ------------------------
// Drizzle ORM instance
// ------------------------
export const db = drizzle(pool, { schema });

// ------------------------
// Test PostgreSQL connection
// ------------------------
(async () => {
  try {
    await pool.query("SELECT 1"); // simple test query
    console.log("✅ PostgreSQL connected (Drizzle ORM)");
  } catch (err: any) {
    console.error("❌ PostgreSQL connection error:", err.message);
  }
})();

