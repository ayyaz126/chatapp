import dotenv from "dotenv";
dotenv.config();

// ------------------------
// Simple Drizzle Kit config for PostgreSQL
// ------------------------

// @ts-ignore
const config: any = {
  schema: "./src/db/schema/*.ts",      // path to your table schemas
  out: "./src/db/migrations",          // migrations output folder
  driver: "pg",                         // PostgreSQL driver
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
};

export default config;
