import {
    pgTable,
    serial,
    integer,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  import { chats } from "./chats.schema";
  import { users } from "./users.schema";
  
  export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
  
    chat_id: integer("chat_id")
      .notNull()
      .references(() => chats.id, { onDelete: "cascade" }),
  
    sender_id: integer("sender_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  
    content: text("content").notNull(),
  
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  });
  