import { db } from "../../../config/db";
import { users } from "../../../db/schema/users.schema";
import { eq } from "drizzle-orm";
import { ilike, or } from "drizzle-orm";

export const getMyProfileService = async (userId: number) => {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
};

export const searchUsersService = async (
    search: string,
    page: number,
    limit: number
  ) => {
    const offset = (page - 1) * limit;
  
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(
        or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`)
        )
      )
      .limit(limit)
      .offset(offset);
  
    return result;
  };
