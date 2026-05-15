import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const stakedTokens = mysqlTable("staked_tokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(), // Foreign key to users table
  tokenSymbol: varchar("tokenSymbol", { length: 10 }).notNull(),
  amount: varchar("amount", { length: 32 }).notNull(),
  stakedAt: timestamp("stakedAt").defaultNow().notNull(),
});

export type StakedToken = typeof stakedTokens.$inferSelect;
export type InsertStakedToken = typeof stakedTokens.$inferInsert;
