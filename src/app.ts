import express from "express";
import cors from "cors";
import helmet from "helmet";

// DB + Redis import
import { db } from "./config/db";
import { redis } from "./config/redis";
import { users } from "./db/schema/users.schema"; // ✅ Import schema

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Chat App API",
  });
});

// Test DB & ORM connection
app.get("/test-db", async (_req, res) => {
  try {
    const allUsers = await db.select().from(users).limit(1); // ✅ Use table object
    res.json({ users: allUsers });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Test Redis connection
app.get("/test-redis", async (_req, res) => {
  try {
    await redis.set("ping", "pong", "EX", 10);
    const value = await redis.get("ping");
    res.json({ value });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
