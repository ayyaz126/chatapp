import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Chat App API",
  });
});

export default app;
