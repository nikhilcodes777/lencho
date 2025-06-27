CREATE TYPE "public"."AccountType" AS ENUM('CHECKING', 'SAVINGS', 'CASH', 'CREDIT_CARD');--> statement-breakpoint
CREATE TABLE "transactions_account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"balance" integer DEFAULT 1000,
	"type" "AccountType" DEFAULT 'CASH' NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions_account" ADD CONSTRAINT "transactions_account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;