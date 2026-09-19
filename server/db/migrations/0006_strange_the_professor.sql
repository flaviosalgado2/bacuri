ALTER TABLE "contas" ALTER COLUMN "vencimento" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "contas" ALTER COLUMN "desconto_ate" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "usuarios" DROP COLUMN "timezone";