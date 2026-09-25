CREATE TABLE "contas_pagar" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" integer NOT NULL,
	"nome" varchar(255) NOT NULL,
	"valor" numeric(15, 2) NOT NULL,
	"vencimento" date NOT NULL,
	"desconto_ate" date,
	"observacoes" text,
	"status" "status" DEFAULT 'pendente' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contas_receber" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" integer NOT NULL,
	"nome" varchar(255) NOT NULL,
	"valor" numeric(15, 2) NOT NULL,
	"vencimento" date NOT NULL,
	"desconto_ate" date,
	"observacoes" text,
	"status" "status" DEFAULT 'pendente' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contas_pagar" ADD CONSTRAINT "contas_pagar_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "contas_receber" ADD CONSTRAINT "contas_receber_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
INSERT INTO "contas_pagar" ("id", "usuario_id", "nome", "valor", "vencimento", "desconto_ate", "observacoes", "status", "criado_em", "atualizado_em")
SELECT "id", "usuario_id", "nome", "valor", "vencimento", "desconto_ate", "observacoes", "status", "criado_em", "atualizado_em"
FROM "contas"
WHERE "tipo" = 'pagar';
--> statement-breakpoint
INSERT INTO "contas_receber" ("id", "usuario_id", "nome", "valor", "vencimento", "desconto_ate", "observacoes", "status", "criado_em", "atualizado_em")
SELECT "id", "usuario_id", "nome", "valor", "vencimento", "desconto_ate", "observacoes", "status", "criado_em", "atualizado_em"
FROM "contas"
WHERE "tipo" = 'receber';
--> statement-breakpoint
SELECT setval('contas_pagar_id_seq', COALESCE((SELECT MAX("id") FROM "contas_pagar"), 1));
--> statement-breakpoint
SELECT setval('contas_receber_id_seq', COALESCE((SELECT MAX("id") FROM "contas_receber"), 1));
--> statement-breakpoint
DROP TABLE "contas" CASCADE;
--> statement-breakpoint
DROP TYPE "public"."tipo";
