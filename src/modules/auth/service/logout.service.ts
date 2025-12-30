import { redis } from "../../../config/redis";

export const logoutService = async (accessToken: string, refreshToken: string) => {
  // Access token blacklist
  await redis.set(`bl_${accessToken}`, "true", "EX", 60 * 60 * 24); // 24 hours expiry

  // Refresh token blacklist
  await redis.set(`bl_${refreshToken}`, "true", "EX", 60 * 60 * 24); // 24 hours expiry
};
