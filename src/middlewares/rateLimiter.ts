import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // max 5 requests
  message: {
    status: "error",
    message: "Too many login attempts. Please try again after 5 minutes."
  },
});
