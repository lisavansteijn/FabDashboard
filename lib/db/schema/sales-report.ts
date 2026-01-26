import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth";

// Sales Report Schema Represents all the CSV data that is imported into the database. Later we want to link them with the Products.
export const SalesReport = sqliteTable("sales_report", {
  id: int().primaryKey({ autoIncrement: true }),
  day: int().notNull().$default(() => Date.now()), // ISO date format (YYYY-MM-DD)
  source: text().notNull().default("Fab"),
  listingTitle: text().notNull(),
  license: text().notNull(), // "Personal" or "Professional"
  basePrice: real().notNull(),
  totalVAT: real().notNull(),
  totalTax: real().notNull(),
  netUnits: int().notNull(),
  netSales: real().notNull(),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  hash: text().notNull().unique(),
});

export const InsertSalesReport = createInsertSchema(SalesReport, {
  day: z.coerce.date(),
  source: z.string().min(1),
  listingTitle: z.string().min(1),
  license: z.string().min(1),
  basePrice: z.float32().min(0),
  totalVAT: z.float32().min(0),
  totalTax: z.float32().min(0),
  netUnits: z.number().min(0),
  netSales: z.float32().min(0),
}).omit({
  id: true,
  userId: true,
  hash: true,
});

export type InsertSalesReport = z.infer<typeof InsertSalesReport>;
export type SaleReport = typeof SalesReport.$inferSelect;
