CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`day` text NOT NULL,
	`source` text DEFAULT 'Fab' NOT NULL,
	`listingTitle` text NOT NULL,
	`license` text NOT NULL,
	`basePrice` real NOT NULL,
	`totalVAT` real NOT NULL,
	`totalTax` real NOT NULL,
	`netUnits` integer NOT NULL,
	`netSales` real NOT NULL
);
