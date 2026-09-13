ALTER TABLE "configuracoes" ADD COLUMN "outlook_client_id" varchar(512);--> statement-breakpoint
ALTER TABLE "configuracoes" ADD COLUMN "outlook_client_secret" varchar(512);--> statement-breakpoint
ALTER TABLE "configuracoes" ADD COLUMN "outlook_tenant_id" varchar(255);--> statement-breakpoint
ALTER TABLE "configuracoes" ADD COLUMN "outlook_redirect_uri" varchar(512);