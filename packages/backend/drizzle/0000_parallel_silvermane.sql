CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`desc` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`starred` integer DEFAULT false NOT NULL
);
