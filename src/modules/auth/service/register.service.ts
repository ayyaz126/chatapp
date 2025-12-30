import { db } from "../../../db";
import { users } from "../../../db/schema/users.schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const registerService = async (data: RegisterInput) => {
  const { name, email, password } = data;

  // ✅ email check (FIXED)
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("Email already registered");
  }

  // ✅ password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ insert user
  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });

  return user;
};
