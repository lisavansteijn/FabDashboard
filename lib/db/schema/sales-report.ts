import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth.ts";

export const SalesReport = sqliteTable("sales_report", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  day: int().notNull().$default(() => Date.now()), // ISO date format (YYYY-MM-DD)
  source: text().notNull().default("Fab"),
  listingTitle: text().notNull(),
  license: text().notNull(), // "Personal" or "Professional"
  basePrice: real().notNull(),
  totalVAT: real().notNull(),
  totalTax: real().notNull(),
  netUnits: int().notNull(),
  netSales: real().notNull(),
  userId: int().notNull().references(() => user.id),
});

export type ProductSale = typeof SalesReport.$inferSelect;
