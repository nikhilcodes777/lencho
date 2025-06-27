ALTER TABLE "transactions_account" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "transactions_account" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "transactions_account" ALTER COLUMN "balance" SET NOT NULL;