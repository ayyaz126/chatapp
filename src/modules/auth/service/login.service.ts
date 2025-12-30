import bcrypt from "bcryptjs";
import { db } from "../../../config/db";
import { users } from "../../../db/schema/users.schema";
import { eq } from "drizzle-orm";
import { signAccessToken, signRefreshToken } from "../../../utils/jwt";
import { redis } from "../../../config/redis";

export const loginUser = async (email: string, password: string) => {
    // 1️⃣ Find user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) throw new Error("Invalid credentials");

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // 3️⃣ Generate JWT
    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    // 4️⃣ Store refresh token in Redis
    await redis.set(`refresh_token:${user.id}`, refreshToken, "EX", 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
};
