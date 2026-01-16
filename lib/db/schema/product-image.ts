import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { Product } from "./product";

export const ProductImage = sqliteTable("product_image", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull().unique(),
  productId: int().notNull().references(() => Product.id),
  uploadedAt: int().notNull().$default(() => Date.now()),
  UpdatedAt: int().notNull().$default(() => Date.now()),

  // Foreign Key Example:
  // categoryId: int().notNull().references(() => Category.id),
});

export type ProductImage = typeof ProductImage.$inferSelect;
