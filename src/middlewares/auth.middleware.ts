import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redis } from "../config/redis";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("AUTH HEADER =>", req.headers.authorization); // <-- ADD THIS

        // 1️⃣ Authorization header check
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: "error", message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        // 2️⃣ Check Redis blacklist (optional, recommended)
        const isBlacklisted = await redis.get(`bl_${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ status: "error", message: "Token expired or logged out" });
        }

        // 3️⃣ Verify JWT
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        (req as any).user = decoded; // attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ status: "error", message: "Invalid or expired token" });
    }
};

