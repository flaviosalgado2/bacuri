CREATE TABLE "configuracoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" integer NOT NULL,
	"outlook_ativado" boolean DEFAULT false NOT NULL,
	"outlook_calendario_id" varchar(512),
	"outlook_conta_email" varchar(255),
	"outlook_lembrete_dias" integer DEFAULT 1 NOT NULL,
	"outlook_token" text,
	"outlook_refresh_token" text,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "configuracoes_usuario_id_unique" UNIQUE("usuario_id")
);
--> statement-breakpoint
ALTER TABLE "configuracoes" ADD CONSTRAINT "configuracoes_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;