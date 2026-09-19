ALTER TABLE "contas" ALTER COLUMN "vencimento" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "contas" ALTER COLUMN "desconto_ate" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "timezone" varchar(100) DEFAULT 'America/Sao_Paulo' NOT NULL;