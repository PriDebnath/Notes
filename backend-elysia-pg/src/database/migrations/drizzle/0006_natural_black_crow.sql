--  Manual edit
ALTER TABLE "users" ADD COLUMN "password" varchar(20);--> statement-breakpoint

ALTER TABLE "users" ADD COLUMN "name" varchar(100);

UPDATE "users"
SET "name" = CONCAT(COALESCE("first_name", ''), ' ', COALESCE("last_name", ''));

ALTER TABLE "users" DROP COLUMN "first_name";
ALTER TABLE "users" DROP COLUMN "last_name";

