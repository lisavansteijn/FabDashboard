ALTER TABLE `products` RENAME TO `product`;--> statement-breakpoint
CREATE TABLE `product_image` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`product_id` integer NOT NULL,
	`uploaded_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_image_key_unique` ON `product_image` (`key`);--> statement-breakpoint
CREATE TABLE `sales_report` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`day` integer NOT NULL,
	`source` text DEFAULT 'Fab' NOT NULL,
	`listing_title` text NOT NULL,
	`license` text NOT NULL,
	`base_price` real NOT NULL,
	`total_vat` real NOT NULL,
	`total_tax` real NOT NULL,
	`net_units` integer NOT NULL,
	`net_sales` real NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sales_report_slug_unique` ON `sales_report` (`slug`);--> statement-breakpoint
ALTER TABLE `product` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `price` real NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `uploaded_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `image_url` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `product_slug_unique` ON `product` (`slug`);--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `day`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `source`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `listingTitle`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `license`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `basePrice`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `totalVAT`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `totalTax`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `netUnits`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `netSales`;