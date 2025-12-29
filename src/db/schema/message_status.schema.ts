import {
    pgTable,
    serial,
    integer,
    boolean,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  import { messages } from "./ messages.schema";
  import { users } from "./users.schema";
  
  export const messageStatus = pgTable("message_status", {
    id: serial("id").primaryKey(),
  
    message_id: integer("message_id")
      .notNull()
      .references(() => messages.id, { onDelete: "cascade" }),
  
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  
    is_read: boolean("is_read").default(false).notNull(),
  
    // Drizzle me nullable default hota hai
    read_at: timestamp("read_at"),
  });
  