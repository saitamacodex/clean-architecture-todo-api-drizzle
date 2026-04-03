import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const todoTables = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 150 }),

  isCompleted: boolean("is_completed").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
