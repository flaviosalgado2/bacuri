CREATE TYPE "public"."tema" AS ENUM('system', 'light', 'dark');--> statement-breakpoint
ALTER TABLE "configuracoes" ADD COLUMN "tema" "tema" DEFAULT 'system' NOT NULL;