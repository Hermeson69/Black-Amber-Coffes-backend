PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items_table` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`isStock` integer DEFAULT true NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_items_table`("id", "category", "type", "name", "description", "price", "isStock", "createdAt", "updatedAt", "deletedAt") SELECT "id", "category", "type", "name", "description", "price", "isStock", "createdAt", "updatedAt", "deletedAt" FROM `items_table`;--> statement-breakpoint
DROP TABLE `items_table`;--> statement-breakpoint
ALTER TABLE `__new_items_table` RENAME TO `items_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_order_items_table` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`itemName` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`subTotal` integer NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_order_items_table`("id", "orderId", "itemName", "quantity", "price", "subTotal", "createdAt", "updatedAt", "deletedAt") SELECT "id", "orderId", "itemName", "quantity", "price", "subTotal", "createdAt", "updatedAt", "deletedAt" FROM `order_items_table`;--> statement-breakpoint
DROP TABLE `order_items_table`;--> statement-breakpoint
ALTER TABLE `__new_order_items_table` RENAME TO `order_items_table`;--> statement-breakpoint
CREATE INDEX `order_items_order_idx` ON `order_items_table` (`orderId`);--> statement-breakpoint
CREATE TABLE `__new_orders_table` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`workerId` text,
	`status` text NOT NULL,
	`totalPrice` integer NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`clientId`) REFERENCES `clients_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workerId`) REFERENCES `workers_table`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_orders_table`("id", "clientId", "workerId", "status", "totalPrice", "createdAt", "updatedAt", "deletedAt") SELECT "id", "clientId", "workerId", "status", "totalPrice", "createdAt", "updatedAt", "deletedAt" FROM `orders_table`;--> statement-breakpoint
DROP TABLE `orders_table`;--> statement-breakpoint
ALTER TABLE `__new_orders_table` RENAME TO `orders_table`;--> statement-breakpoint
CREATE INDEX `orders_client_idx` ON `orders_table` (`clientId`);--> statement-breakpoint
CREATE INDEX `orders_worker_idx` ON `orders_table` (`workerId`);--> statement-breakpoint
CREATE TABLE `__new_payments_table` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`amount` integer NOT NULL,
	`method` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text,
	FOREIGN KEY (`orderId`) REFERENCES `orders_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_payments_table`("id", "orderId", "amount", "method", "createdAt", "updatedAt", "deletedAt") SELECT "id", "orderId", "amount", "method", "createdAt", "updatedAt", "deletedAt" FROM `payments_table`;--> statement-breakpoint
DROP TABLE `payments_table`;--> statement-breakpoint
ALTER TABLE `__new_payments_table` RENAME TO `payments_table`;--> statement-breakpoint
CREATE INDEX `payments_order_idx` ON `payments_table` (`orderId`);--> statement-breakpoint
CREATE TABLE `__new_workers_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`salary` integer NOT NULL,
	`role` text NOT NULL,
	`isActive` integer DEFAULT true NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_workers_table`("id", "name", "email", "password", "salary", "role", "isActive", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "email", "password", "salary", "role", "isActive", "createdAt", "updatedAt", "deletedAt" FROM `workers_table`;--> statement-breakpoint
DROP TABLE `workers_table`;--> statement-breakpoint
ALTER TABLE `__new_workers_table` RENAME TO `workers_table`;--> statement-breakpoint
CREATE UNIQUE INDEX `workers_table_email_unique` ON `workers_table` (`email`);