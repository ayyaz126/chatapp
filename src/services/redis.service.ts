import { redis } from "../config/redis";

export const RedisService = {
  set: async (key: string, value: string, ttlSeconds?: number) => {
    if (ttlSeconds) {
      await redis.set(key, value, "EX", ttlSeconds);
    } else {
      await redis.set(key, value);
    }
  },

  get: async (key: string) => {
    return await redis.get(key);
  },

  del: async (key: string) => {
    await redis.del(key);
  },

  exists: async (key: string) => {
    return await redis.exists(key);
  },
};
