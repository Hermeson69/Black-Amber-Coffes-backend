PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_clients_table` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`phone` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` text
);
--> statement-breakpoint
INSERT INTO `__new_clients_table`("id", "name", "email", "password", "phone", "createdAt", "updatedAt", "deletedAt") SELECT "id", "name", "email", "password", "phone", "createdAt", "updatedAt", "deletedAt" FROM `clients_table`;--> statement-breakpoint
DROP TABLE `clients_table`;--> statement-breakpoint
ALTER TABLE `__new_clients_table` RENAME TO `clients_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_table_email_unique` ON `clients_table` (`email`);