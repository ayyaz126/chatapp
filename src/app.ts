import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/routes/auth.routes";
import userRoutes from "./modules/users/routes/user.routes";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// ✅ Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Chat App API",
  });
});

// ✅ Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
