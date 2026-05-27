-- ALTER TABLE "quotes" ALTER COLUMN "user_id" SET NOT NULL;
-- Manul edits
-- ALTER TABLE "quotes" SET "user_id" = 1 WHERE "user_id" IS NULL
UPDATE "quotes" SET user_id = 1 WHERE user_id IS NULL;
ALTER TABLE "quotes" ALTER COLUMN user_id SET NOT NULL;