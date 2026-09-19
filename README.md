# Bacuri

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.x-00C58E?logo=nuxt.js&logoColor=white" alt="Nuxt 4" />
  <img src="https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-18.x-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white" alt="Docker Compose" />
  <img src="https://img.shields.io/badge/Zod-3.x-3068B7?logo=zod&logoColor=white" alt="Zod" />
</p>

**Bacuri** é uma aplicação web moderna para **controle financeiro pessoal**, focada no gerenciamento de **contas a pagar e a receber**. Com interface elegante, autenticação segura e painel de controle intuitivo, o Bacuri ajuda você a acompanhar vencimentos, saldos e status de pagamentos em um só lugar.

---

## Funcionalidades

- **Dashboard financeiro** com visão geral de:
  - Total a pagar
  - Total a receber
  - Saldo projetado
  - Contas pendentes
  - Próximos vencimentos (7 dias)
- **Gerenciamento completo de contas** (CRUD):
  - Contas a pagar e a receber
  - Status: *pendente* e *pago*
  - Filtros por tipo, status e período
  - Descontos e observações
- **Autenticação de usuários**:
  - Cadastro e login
  - Perfis `usuario` e `root`
  - Usuário root criado automaticamente na primeira execução
  - Apenas o root pode cadastrar, editar e desativar outros usuários
- **Migrações automáticas** do banco de dados no startup
- **Interface responsiva** com Nuxt UI
- **Testes automatizados** com Vitest

---

## Stack Tecnológica

O Bacuri é construído com um conjunto moderno de ferramentas do ecossistema JavaScript/TypeScript, focado em performance, segurança e boa experiência de desenvolvimento.

### Core da aplicação

| Biblioteca | Badge | Finalidade |
|------------|-------|------------|
| [Nuxt 4](https://nuxt.com/) | <img src="https://img.shields.io/badge/Nuxt-4.x-00C58E?logo=nuxt.js&logoColor=white" alt="Nuxt" /> | Framework full-stack baseado em Vue. Responsável pelo SSR, rotas, API serverless (Nitro), build e DX. |
| [Vue 3](https://vuejs.org/) | <img src="https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white" alt="Vue" /> | Biblioteca reativa para construção da interface do usuário com Composition API. |
| [Vue Router](https://router.vuejs.org/) | <img src="https://img.shields.io/badge/Vue_Router-4.x-4FC08D?logo=vue.js&logoColor=white" alt="Vue Router" /> | Gerenciamento de rotas do lado do cliente, integrado automaticamente pelo Nuxt. |
| [TypeScript](https://www.typescriptlang.org/) | <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /> | Adiciona tipagem estática ao JavaScript, aumentando segurança e autocomplete no editor. |

### Interface e experiência do usuário

| Biblioteca | Badge | Finalidade |
|------------|-------|------------|
| [@nuxt/ui](https://ui.nuxt.com/) | <img src="https://img.shields.io/badge/Nuxt_UI-4.x-00C58E?logo=nuxt.js&logoColor=white" alt="Nuxt UI" /> | Biblioteca de componentes de interface (botões, cards, formulários, modais) com estilização pronta e acessível. |
| [@iconify-json/lucide](https://iconify.design/) | <img src="https://img.shields.io/badge/Iconify-Lucide-F565A9?logo=iconify&logoColor=white" alt="Iconify Lucide" /> | Conjunto de ícones vetoriais utilizados nos botões, menus e indicadores visuais. |

### Banco de dados e ORM

| Biblioteca | Badge | Finalidade |
|------------|-------|------------|
| [PostgreSQL](https://www.postgresql.org/) | <img src="https://img.shields.io/badge/PostgreSQL-18.x-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" /> | Banco de dados relacional robusto que armazena usuários e contas. |
| [Drizzle ORM](https://orm.drizzle.team/) | <img src="https://img.shields.io/badge/Drizzle_ORM-0.x-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle ORM" /> | ORM type-safe para TypeScript. Define o schema e executa queries SQL de forma programática. |
| [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) | <img src="https://img.shields.io/badge/Drizzle_Kit-0.x-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle Kit" /> | CLI responsável por gerar e aplicar migrations de banco de dados. |
| [pg](https://www.npmjs.com/package/pg) | <img src="https://img.shields.io/badge/pg-8.x-4169E1?logo=postgresql&logoColor=white" alt="pg" /> | Driver oficial do Node.js para conexão com PostgreSQL. |
| [@types/pg](https://www.npmjs.com/package/@types/pg) | <img src="https://img.shields.io/badge/@types/pg-8.x-3178C6?logo=typescript&logoColor=white" alt="@types/pg" /> | Tipagens TypeScript para o driver `pg`. |

### Autenticação e validação

| Biblioteca | Badge | Finalidade |
|------------|-------|------------|
| [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) | <img src="https://img.shields.io/badge/nuxt--auth--utils-0.x-00C58E?logo=nuxt.js&logoColor=white" alt="nuxt-auth-utils" /> | Módulo do Nuxt para autenticação baseada em sessão, gerenciando login, logout e rotas protegidas. |
| [Zod](https://zod.dev/) | <img src="https://img.shields.io/badge/Zod-4.x-3068B7?logo=zod&logoColor=white" alt="Zod" /> | Biblioteca de validação e inferência de tipos. Garante que dados de entrada (formulários, API) estejam corretos. |

### Testes

| Biblioteca | Badge | Finalidade |
|------------|-------|------------|
| [Vitest](https://vitest.dev/) | <img src="https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white" alt="Vitest" /> | Test runner rápido e moderno, compatível com a API do Jest. |
| [@nuxt/test-utils](https://test-utils.nuxtjs.org/) | <img src="https://img.shields.io/badge/@nuxt/test_utils-4.x-00C58E?logo=nuxt.js&logoColor=white" alt="@nuxt/test-utils" /> | Utilitários oficiais do Nuxt para testar componentes e endpoints de forma integrada. |
| [happy-dom](https://github.com/capricorn86/happy-dom) | <img src="https://img.shields.io/badge/happy--dom-20.x-FF6F00?logo=html5&logoColor=white" alt="happy-dom" /> | Implementação leve do DOM para execução de testes de componentes sem precisar de navegador real. |

### Containerização e infraestrutura

| Ferramenta | Badge | Finalidade |
|------------|-------|------------|
| [Docker](https://www.docker.com/) | <img src="https://img.shields.io/badge/Docker-24.x-2496ED?logo=docker&logoColor=white" alt="Docker" /> | Cria containers isolados para a aplicação Node.js e o banco PostgreSQL. |
| [Docker Compose](https://docs.docker.com/compose/) | <img src="https://img.shields.io/badge/Docker_Compose-2.x-2496ED?logo=docker&logoColor=white" alt="Docker Compose" /> | Orquestra os containers de desenvolvimento com um único comando. |

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão compatível com o `node:24` da imagem Docker)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

## Configuração do ambiente

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd bacuri
```

2. Os arquivos de variáveis de ambiente já estão separados por ambiente:

| Arquivo | Ambiente |
|---------|----------|
| `.env` | Uso pessoal local (`docker-compose.yml`) |
| `.env.dev` | Desenvolvimento (`docker-compose.dev.yml`) |
| `.env.prod` | Produção (`docker-compose.prod.yml`) |

3. Ajuste as variáveis em cada arquivo conforme necessário.

> **Importante:** em produção, defina uma `NUXT_SESSION_PASSWORD` forte com pelo menos 32 caracteres e altere as credenciais do root e do PostgreSQL.

---

## Como rodar

O projeto possui **3 ambientes** diferentes, cada um com seu arquivo Docker Compose:

| Ambiente | Arquivo | Imagem Docker | PostgreSQL | Finalidade |
|----------|---------|---------------|------------|------------|
| **Uso pessoal local** | `docker-compose.yml` | `Dockerfile.local` | `./postgres_data` compartilhado com dev (banco `nuxt_local`) | Rodar o Bacuri na sua máquina como uma aplicação pessoal. Sobe sozinho ao ligar o Docker. |
| **Desenvolvimento** | `docker-compose.dev.yml` | `Dockerfile` (base) | Compartilhado | Ambiente para você desenvolver. Não sobe a app automaticamente — você entra e roda os comandos. |
| **Produção** | `docker-compose.prod.yml` | `Dockerfile.prod` (multi-stage otimizada) | Próprio | Nginx + HTTPS + réplicas escaláveis do Nuxt + PostgreSQL + Redis. |

> **Nota:** os ambientes **local** e **dev** compartilham o mesmo container PostgreSQL (`container_name: postgres`) e o mesmo diretório de dados `./postgres_data`, mas usam bancos separados:
> - **dev** → `nuxt_dev`
> - **local** → `nuxt_local`

---

### Opção 1: Uso pessoal local (recomendado para uso próprio)

Esse é o ambiente para você usar o Bacuri na sua própria máquina, com seus dados reais. Ele builda a aplicação e sobe tudo automaticamente.

```bash
# Inicie os serviços em segundo plano
docker compose up -d
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

#### Ver logs

```bash
docker compose logs -f nuxt
```

#### Encerrar

```bash
docker compose down
```

#### Reiniciar do zero (remove banco local)

```bash
docker compose down -v
```

> ⚠️ `down -v` remove todos os volumes, incluindo os dados do PostgreSQL.

#### Iniciar automaticamente com o sistema

Como o compose local usa `restart: always`, os containers sobem automaticamente quando o Docker daemon iniciar. Para isso funcionar, o Docker precisa estar configurado para iniciar com o sistema operacional:

- **Linux:** `sudo systemctl enable docker`
- **macOS:** Docker Desktop → Settings → General → "Start Docker Desktop when you log in"
- **Windows:** Docker Desktop → Settings → General → "Start Docker Desktop when you sign in"

---

### Opção 2: Desenvolvimento

Use o arquivo `docker-compose.dev.yml`. Esse ambiente monta o código do projeto no container e **não inicia a aplicação automaticamente**, para você ter controle total.

```bash
# Sobe o container de desenvolvimento e o banco
docker compose -f docker-compose.dev.yml up -d

# Instale as dependências (apenas na primeira vez ou quando mudar o package.json)
docker exec nuxt-dev npm install

# Inicie o servidor de desenvolvimento
docker exec -it nuxt-dev npm run dev -- --host 0.0.0.0
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

O banco de dados fica disponível em `localhost:5432`.

#### Encerrar

```bash
docker compose -f docker-compose.dev.yml down
```

#### Reiniciar do zero (remove banco local)

```bash
docker compose -f docker-compose.dev.yml down -v
```

> ⚠️ `down -v` remove todos os volumes, incluindo os dados do PostgreSQL.

---

### Opção 3: Produção com Docker Compose (Nginx + HTTPS + múltiplas réplicas)

Use o arquivo `docker-compose.prod.yml`. Essa configuração é profissional e inclui:

- **Nginx** como reverse proxy, load balancer e HTTPS
- **Réplicas escaláveis do Nuxt** — você define a quantidade
- **PostgreSQL** com volume persistente
- **Redis** para cache e sessões compartilhadas

#### 1. Configure as variáveis de ambiente

Edite o `.env.prod` com valores seguros (especialmente `NUXT_SESSION_PASSWORD`, `POSTGRES_PASSWORD` e `ROOT_PASSWORD`).

#### 2. Prepare o certificado SSL

Para testes locais, gere um certificado autoassinado:

```bash
./scripts/generate-ssl.sh
```

> Em produção real, substitua os arquivos `nginx/ssl/cert.pem` e `nginx/ssl/key.pem` pelos certificados válidos do seu domínio.

#### 3. Inicie os serviços

Por padrão sobe 1 réplica do Nuxt:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Para subir com mais réplicas (exemplo: 5):

```bash
docker compose -f docker-compose.prod.yml up -d --build --scale nuxt=5
```

Acesse a aplicação em:
- **HTTPS:** [https://localhost](https://localhost)
- **HTTP:** redireciona automaticamente para HTTPS

#### Ver logs de produção

```bash
# Todos os serviços
docker compose -f docker-compose.prod.yml logs -f

# Apenas o Nginx
docker compose -f docker-compose.prod.yml logs -f nginx

# Apenas as réplicas do Nuxt
docker compose -f docker-compose.prod.yml logs -f nuxt
```

#### Encerrar os containers de produção

```bash
docker compose -f docker-compose.prod.yml down
```

#### Reiniciar do zero em produção (remove banco e cache)

```bash
docker compose -f docker-compose.prod.yml down -v
```

> ⚠️ `down -v` remove todos os volumes, incluindo os dados do PostgreSQL e Redis.

---

### Opção 4: Localmente (sem Docker)

Você precisa de um PostgreSQL rodando localmente e apontado pela variável `DATABASE_URL`.

```bash
# Instale as dependências
npm install

# Aplique as migrations (executadas automaticamente no dev, mas pode forçar)
npm run db:migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila a aplicação para produção |
| `npm run generate` | Gera uma versão estática da aplicação |
| `npm run preview` | Executa uma prévia da build de produção localmente |
| `npm run postinstall` | Prepara o Nuxt após instalar dependências |
| `npm run db:generate` | Gera novas migrations com Drizzle Kit |
| `npm run db:migrate` | Aplica as migrations no banco de dados |
| `npm run test` | Executa os testes com Vitest |
| `npm run test:watch` | Executa os testes em modo watch |

---

## Banco de dados e migrations

As migrations ficam em `server/db/migrations/` e são aplicadas automaticamente quando a aplicação inicia, graças ao plugin `server/plugins/init.ts`.

Para gerenciar o esquema manualmente:

```bash
# Gerar uma nova migration a partir das alterações no schema
npm run db:generate

# Aplicar as migrations no banco
npm run db:migrate
```

O schema está definido em `server/db/schema.ts` e contém as tabelas:

- `usuarios`: usuários do sistema, com perfis `usuario` e `root`
- `contas`: contas a pagar/receber vinculadas ao usuário

---

## Estrutura do projeto

O Bacuri segue a convenção full-stack do Nuxt 4, onde o frontend e o backend convivem no mesmo repositório, mas com responsabilidades bem separadas:

- **`app/`** → **Frontend**: interface do usuário construída com Vue 3 e Nuxt UI.
- **`server/`** → **Backend**: API REST, banco de dados e lógica de negócio executada pelo Nitro (motor do Nuxt).

```
bacuri/
├── app/                    # FRONTEND — Interface Vue/Nuxt
│   ├── components/         # Componentes Vue reutilizáveis
│   ├── composables/        # Lógica reutilizável do frontend
│   ├── layouts/            # Layouts das páginas
│   ├── middleware/         # Proteção de rotas (logado, root, visitante)
│   ├── pages/              # Rotas e telas da aplicação
│   │   ├── contas/         # Gestão de contas a pagar/receber
│   │   └── usuarios/       # Gestão de usuários (exclusivo para root)
│   └── assets/             # CSS e recursos estáticos
├── server/                 # BACKEND — API Nitro
│   ├── api/                # Endpoints REST
│   ├── db/                 # Schema e migrations do Drizzle
│   ├── plugins/            # Inicialização e migrations automáticas
│   └── utils/              # Utilitários do servidor
├── public/                 # Arquivos públicos
├── tests/                  # Testes com Vitest
├── docker-compose.yml      # Orquestração do ambiente de uso pessoal local
├── docker-compose.dev.yml  # Orquestração do ambiente de desenvolvimento
├── docker-compose.prod.yml # Orquestração dos containers de produção
├── Dockerfile              # Imagem base do ambiente de desenvolvimento
├── Dockerfile.local        # Imagem para uso pessoal local
├── Dockerfile.prod         # Imagem otimizada para produção
├── postgres-init.sql       # Cria os bancos nuxt_local e nuxt_dev no PostgreSQL
├── nginx/                  # Configuração do Nginx (HTTPS + load balancer)
│   ├── nginx.conf          # Configuração principal
│   └── ssl/                # Certificados SSL (você coloca os reais aqui)
└── scripts/                # Scripts auxiliares
    └── generate-ssl.sh     # Gera certificado SSL autoassinado para testes
├── drizzle.config.ts       # Configuração do Drizzle Kit
├── nuxt.config.ts          # Configuração do Nuxt
├── vitest.config.ts        # Configuração dos testes
└── .env.example            # Exemplo de variáveis de ambiente
```

---

## Testes

O projeto utiliza **Vitest** para testes unitários e de integração.

```bash
# Rodar todos os testes
npm run test

# Rodar em modo watch durante o desenvolvimento
npm run test:watch
```

---

## Variáveis de ambiente

| Variável | Descrição | Obrigatória | Arquivo |
|----------|-----------|-------------|---------|
| `NUXT_SESSION_PASSWORD` | Chave secreta para criptografar sessões (mín. 32 caracteres) | Sim | `.env`, `.env.dev`, `.env.prod` |
| `DATABASE_URL` | URL de conexão com o PostgreSQL | Sim | `.env`, `.env.dev`, `.env.prod` |
| `ROOT_EMAIL` | E-mail do usuário root criado automaticamente | Não | `.env`, `.env.dev`, `.env.prod` |
| `ROOT_PASSWORD` | Senha do usuário root criado automaticamente | Não | `.env`, `.env.dev`, `.env.prod` |
| `POSTGRES_DB` | Nome do banco de dados usado pelo `docker-compose.prod.yml` | Sim (produção) | `.env.prod` |
| `POSTGRES_USER` | Usuário do PostgreSQL usado pelo `docker-compose.prod.yml` | Sim (produção) | `.env.prod` |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL usada pelo `docker-compose.prod.yml` | Sim (produção) | `.env.prod` |
| `APP_ENV` | Identificação do ambiente (`local`, `dev`, `prod`) | Definido nos composes | - |

---

## Cheat Sheet

Referência rápida dos comandos mais usados.

### Uso pessoal local

```bash
docker compose up -d
docker compose logs -f nuxt
docker compose down
docker compose down -v
```

### Desenvolvimento

```bash
docker compose -f docker-compose.dev.yml up -d
docker exec nuxt-dev npm install
docker exec -it nuxt-dev npm run dev -- --host 0.0.0.0
docker compose -f docker-compose.dev.yml down
```

### Produção

```bash
./scripts/generate-ssl.sh
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml up -d --build --scale nuxt=5
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml down
```

### Backup do PostgreSQL

```bash
# Backup
docker exec postgres-prod pg_dump -U bacuri -d bacuri > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
docker exec -i postgres-prod psql -U bacuri -d bacuri < backup_20260918_120000.sql
```

### Copiar dados de dev para local (comando único)

Se precisar copiar os dados do banco `nuxt_dev` para `nuxt_local`:

```bash
docker exec postgres pg_dump -U nuxt_dev -d nuxt_dev | docker exec -i postgres psql -U nuxt_dev -d nuxt_local
```

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<p align="center">Feito com 💚 e organização financeira em mente.</p>
