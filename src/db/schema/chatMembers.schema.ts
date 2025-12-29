import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { chats } from "./chats.schema";
import { users } from "./users.schema";

export const chatMembers = pgTable("chat_members", {
  id: serial("id").primaryKey(),
  chat_id: integer("chat_id")
    .notNull()
    .references(() => chats.id),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  joined_at: timestamp("joined_at").defaultNow(),
});
