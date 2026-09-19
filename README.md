# Bacuri

Aplicação web para **controle financeiro pessoal**, focada no gerenciamento de **contas a pagar e a receber**.

---

## O que faz

- Dashboard com total a pagar, a receber, saldo projetado e próximos vencimentos
- CRUD completo de contas (pagar/receber, status, filtros, descontos, observações)
- Autenticação com perfis `usuario` e `root`
- PWA instalável no celular/desktop com funcionamento offline
- Migrações automáticas de banco no startup
- Interface responsiva com Nuxt UI

---

## Tecnologias

| Tecnologia | Para que serve |
|------------|----------------|
| [Nuxt 4](https://nuxt.com/) | Framework full-stack com Vue, SSR, rotas e API serverless (Nitro) |
| [Vue 3](https://vuejs.org/) | Biblioteca reativa para construção da interface |
| [Vue Router](https://router.vuejs.org/) | Roteamento do lado do cliente |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e segurança no código |
| [@nuxt/ui](https://ui.nuxt.com/) | Componentes de interface prontos e acessíveis |
| [@iconify-json/lucide](https://iconify.design/) | Ícones vetoriais usados na interface |
| [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) | Autenticação baseada em sessão |
| [Zod](https://zod.dev/) | Validação de dados de formulários e API |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados relacional |
| [Drizzle ORM](https://orm.drizzle.team/) | ORM type-safe para TypeScript |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | Geração e aplicação de migrations |
| [pg](https://www.npmjs.com/package/pg) | Driver Node.js para PostgreSQL |
| [chart.js](https://www.chartjs.org/) + [vue-chartjs](https://vue-chartjs.org/) | Gráficos do dashboard |
| [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt) | Gera manifesto, service worker e ícones para PWA |
| [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) | Geração automática de ícones PWA |
| [Vitest](https://vitest.dev/) | Testes automatizados |
| [@nuxt/test-utils](https://test-utils.nuxtjs.org/) | Utilitários para testar componentes e endpoints Nuxt |
| [happy-dom](https://github.com/capricorn86/happy-dom) | DOM leve para execução dos testes |
| [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) | Containers da aplicação e do banco de dados |

---

## Ambientes

O projeto tem 3 arquivos Docker Compose:

| Arquivo | Ambiente | Finalidade |
|---------|----------|------------|
| `docker-compose.yml` | Uso pessoal local | Roda o Bacuri na sua máquina com seus dados reais. Sobe sozinho. |
| `docker-compose.dev.yml` | Desenvolvimento | Container manual para você rodar comandos de dev dentro dele. |
| `docker-compose.prod.yml` | Produção | Nginx, HTTPS, réplicas do Nuxt, PostgreSQL e Redis. |

> **Local** e **dev** compartilham o mesmo PostgreSQL (`container_name: postgres-shared`), mas usam bancos separados:
> - `dev` → `nuxt_dev`
> - `local` → `nuxt_local`

---

## Como rodar

### 1. Uso pessoal local (recomendado)

Copie e ajuste as variáveis de ambiente:

```bash
cp .env.example .env
```

Suba a aplicação:

```bash
docker compose up -d
```

Acesse: [http://localhost:3000](http://localhost:3000)

O código é montado como volume, então alterações em `.vue`, `.ts`, `.css` refletem automaticamente (no modo dev).

---

### 2. Testar o PWA no ambiente local

O PWA **só funciona após o build de produção**. No modo dev ele fica desabilitado.

```bash
docker compose down
rm -rf .output .nuxt
NUXT_COMMAND="npm run preview:build" NODE_ENV=production docker compose up -d --build
```

Acesse: [http://localhost:3000](http://localhost:3000)

Para voltar ao modo dev:

```bash
docker compose down
docker compose up -d
```

#### Limpar cache do navegador

Se a tela aparecer desfigurada, limpe o service worker antigo:

1. Abra `http://localhost:3000`
2. DevTools → `Application → Service Workers` → **Unregister**
3. DevTools → `Application → Storage` → **Clear site data**
4. Recarregue com `Ctrl+Shift+R` (ou `Cmd+Shift+R` no Mac)

---

### 3. Desenvolvimento

```bash
docker compose -f docker-compose.dev.yml up -d
docker exec -it nuxt-dev npm run dev -- --host 0.0.0.0
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

### 4. Produção

Configure o `.env.prod`, gere o certificado SSL e suba:

```bash
# Certificado autoassinado para testes
./scripts/generate-ssl.sh

# Ou Let's Encrypt para produção real
./scripts/init-ssl.sh

# Subir
docker compose -f docker-compose.prod.yml up -d --build
```

Acesse: [https://localhost](https://localhost) (ou seu domínio configurado)

---

### 5. Sem Docker

Precisa de um PostgreSQL local e `DATABASE_URL` configurada.

```bash
npm install
npm run db:migrate
npm run dev
```

---

## Scripts úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila a aplicação para produção |
| `npm run preview` | Pré-visualiza a build de produção já existente |
| `npm run preview:build` | Faz build e inicia o servidor de produção |
| `npm run generate` | Gera versão estática da aplicação |
| `npm run docker:dev` | Sobe o Docker local em modo desenvolvimento |
| `npm run docker:preview` | Sobe o Docker local em modo produção/PWA |
| `npm run docker:down` | Derruba os containers Docker |
| `npm run db:generate` | Gera uma nova migration com Drizzle Kit |
| `npm run db:migrate` | Aplica as migrations no banco |
| `npm run test` | Executa os testes com Vitest |
| `npm run test:watch` | Executa os testes em modo watch |

> Se você não tem `npm` no host, use os comandos `docker compose` diretamente mostrados nas seções acima.

---

## Comandos Docker rápidos

```bash
# Local dev
docker compose up -d
docker compose logs -f nuxt
docker compose down

# PWA preview
docker compose down
rm -rf .output .nuxt
NUXT_COMMAND="npm run preview:build" NODE_ENV=production docker compose up -d --build

# Dev manual
docker compose -f docker-compose.dev.yml up -d
docker exec -it nuxt-dev npm run dev -- --host 0.0.0.0

# Produção
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `NUXT_SESSION_PASSWORD` | Chave secreta para criptografar sessões (mín. 32 caracteres) | Sim |
| `DATABASE_URL` | URL de conexão com o PostgreSQL | Sim |
| `ROOT_EMAIL` | E-mail do usuário root criado automaticamente | Não |
| `ROOT_PASSWORD` | Senha do usuário root criado automaticamente | Não |

Em produção também são necessárias `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DOMAIN` e `EMAIL`.

---

## Estrutura do projeto

```
bacuri/
├── app/                    # Frontend Vue/Nuxt
│   ├── components/         # Componentes reutilizáveis
│   ├── composables/        # Lógica reutilizável
│   ├── layouts/            # Layouts das páginas
│   ├── middleware/         # Proteção de rotas
│   ├── pages/              # Rotas e telas
│   ├── plugins/            # Plugins do Nuxt
│   └── assets/             # CSS e recursos estáticos
├── server/                 # Backend API Nitro
│   ├── api/                # Endpoints REST
│   ├── db/                 # Schema e migrations do Drizzle
│   ├── plugins/            # Inicialização e migrations automáticas
│   └── utils/              # Utilitários do servidor
├── public/                 # Arquivos públicos (ícones, manifest, logo)
├── tests/                  # Testes com Vitest
├── docker-compose.yml      # Ambiente local pessoal
├── docker-compose.dev.yml  # Ambiente de desenvolvimento manual
├── docker-compose.prod.yml # Ambiente de produção
├── Dockerfile              # Imagem base de desenvolvimento
├── Dockerfile.local        # Imagem para uso pessoal local
├── Dockerfile.prod         # Imagem otimizada para produção
├── nuxt.config.ts          # Configuração do Nuxt e PWA
└── README.md               # Este arquivo
```

---

## Banco de dados

Migrations ficam em `server/db/migrations/` e são aplicadas automaticamente no startup.

```bash
npm run db:generate   # Gerar nova migration
npm run db:migrate    # Aplicar migrations
```

---

## Testes

```bash
npm run test
npm run test:watch
```

---

## Sobre o PWA

O Bacuri pode ser instalado como aplicativo no celular ou desktop.

- **Vantagens:** acesso rápido via ícone na tela inicial, experiência de app nativo, funcionamento offline parcial e notificações push no futuro.
- **Como testar:** use o modo `preview` de produção. Em desenvolvimento o PWA fica desabilitado para não atrapalhar o hot reload.
- **Por que só funciona no build:** o service worker, manifesto e ícones PWA são gerados apenas durante `nuxt build`.

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).
