import { RedisService } from "./redis.service";

const ONLINE_PREFIX = "online_user:";
const TYPING_PREFIX = "typing_user:";

export const PresenceService = {
  setOnline: async (userId: string) => {
    await RedisService.set(ONLINE_PREFIX + userId, "true", 60); // TTL 60s
  },

  setOffline: async (userId: string) => {
    await RedisService.del(ONLINE_PREFIX + userId);
  },

  isOnline: async (userId: string) => {
    const val = await RedisService.get(ONLINE_PREFIX + userId);
    return val === "true";
  },

  setTyping: async (chatId: string, userId: string) => {
    await RedisService.set(`${TYPING_PREFIX}${chatId}:${userId}`, "true", 5);
  },

  stopTyping: async (chatId: string, userId: string) => {
    await RedisService.del(`${TYPING_PREFIX}${chatId}:${userId}`);
  },

  isTyping: async (chatId: string, userId: string) => {
    const val = await RedisService.get(`${TYPING_PREFIX}${chatId}:${userId}`);
    return val === "true";
  },
};
