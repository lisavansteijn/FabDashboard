import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const Product = sqliteTable("product", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  price: real().notNull(),
  uploadedAt: int().notNull().$default(() => Date.now()),
  UpdatedAt: int().notNull().$default(() => Date.now()),
  userId: int().notNull().references(() => user.id),
  // Foreign Key Example:
  // categoryId: int().notNull().references(() => Category.id),
});

export type ProductSale = typeof Product.$inferSelect;
