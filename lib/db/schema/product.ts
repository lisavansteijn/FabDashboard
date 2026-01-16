import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Product = sqliteTable("product", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  price: real().notNull(),
  uploadedAt: int().notNull().$default(() => Date.now()),
  UpdatedAt: int().notNull().$default(() => Date.now()),
  ImageUrl: text().notNull(),
  // Foreign Key Example:
  // categoryId: int().notNull().references(() => Category.id),
});

export type ProductSale = typeof Product.$inferSelect;
