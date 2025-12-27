CREATE TABLE `clients_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`phone` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clients_table_email_unique` ON `clients_table` (`email`);--> statement-breakpoint
CREATE TABLE `items_table` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`isStock` integer DEFAULT true NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
CREATE TABLE `order_items_table` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`itemName` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`subTotal` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `order_items_order_idx` ON `order_items_table` (`orderId`);--> statement-breakpoint
CREATE TABLE `orders_table` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`workerId` text,
	`status` text NOT NULL,
	`totalPrice` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`clientId`) REFERENCES `clients_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workerId`) REFERENCES `workers_table`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `orders_client_idx` ON `orders_table` (`clientId`);--> statement-breakpoint
CREATE INDEX `orders_worker_idx` ON `orders_table` (`workerId`);--> statement-breakpoint
CREATE TABLE `payments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`amount` integer NOT NULL,
	`method` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `payments_order_idx` ON `payments_table` (`orderId`);--> statement-breakpoint
CREATE TABLE `workers_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`salary` integer NOT NULL,
	`role` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workers_table_email_unique` ON `workers_table` (`email`);