CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" char,
	"last_name" char,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false
);
