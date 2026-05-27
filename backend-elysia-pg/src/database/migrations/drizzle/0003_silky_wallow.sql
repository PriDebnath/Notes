ALTER TABLE "quotes" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;