CREATE TYPE "public"."perfil" AS ENUM('usuario', 'root');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pendente', 'pago');--> statement-breakpoint
CREATE TYPE "public"."tipo" AS ENUM('pagar', 'receber');--> statement-breakpoint
CREATE TABLE "contas" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" integer NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tipo" "tipo" NOT NULL,
	"valor" numeric(15, 2) NOT NULL,
	"vencimento" timestamp NOT NULL,
	"desconto_ate" timestamp,
	"observacoes" text,
	"status" "status" DEFAULT 'pendente' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	"atualizado_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"senha_hash" varchar(255) NOT NULL,
	"perfil" "perfil" DEFAULT 'usuario' NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contas" ADD CONSTRAINT "contas_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;