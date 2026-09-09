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

2. Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

3. Ajuste as variáveis no `.env` conforme necessário:

```env
NUXT_SESSION_PASSWORD=change-me-in-production-min-32-characters-long
DATABASE_URL=postgresql://nuxt_dev:nuxt_dev@localhost:5432/nuxt_dev

# Usuário root criado automaticamente na primeira execução
ROOT_EMAIL=root@admin.com
ROOT_PASSWORD=admin123456
```

> **Importante:** em produção, defina uma `NUXT_SESSION_PASSWORD` forte com pelo menos 32 caracteres e altere as credenciais do root.

---

## Como rodar

### Opção 1: Com Docker Compose (recomendado)

Essa opção sobe a aplicação Nuxt e o banco PostgreSQL em containers isolados.

```bash
# Inicie os serviços em segundo plano
docker compose up -d

# Instale as dependências (apenas na primeira vez ou quando mudar o package.json)
docker exec nuxt-dev npm install

# Inicie o servidor de desenvolvimento
docker exec -it nuxt-dev npm run dev -- --host 0.0.0.0
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

O banco de dados fica disponível em `localhost:5432`.

#### Encerrar os containers

```bash
docker compose down
```

#### Reiniciar do zero (remove banco local)

```bash
docker compose down -v
```

> ⚠️ `down -v` remove todos os volumes, incluindo os dados do PostgreSQL.

---

### Opção 2: Localmente (sem Docker)

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
│   ├── middleware/         # Proteção de rotas no frontend
│   ├── pages/              # Rotas e telas da aplicação
│   └── assets/             # CSS e recursos estáticos
├── server/                 # BACKEND — API Nitro
│   ├── api/                # Endpoints REST
│   ├── db/                 # Schema e migrations do Drizzle
│   ├── plugins/            # Inicialização e migrations automáticas
│   └── utils/              # Utilitários do servidor
├── public/                 # Arquivos públicos
├── tests/                  # Testes com Vitest
├── docker-compose.yml      # Orquestração dos containers
├── Dockerfile              # Imagem do ambiente Node.js
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

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `NUXT_SESSION_PASSWORD` | Chave secreta para criptografar sessões (mín. 32 caracteres) | Sim |
| `DATABASE_URL` | URL de conexão com o PostgreSQL | Sim |
| `ROOT_EMAIL` | E-mail do usuário root criado automaticamente | Não |
| `ROOT_PASSWORD` | Senha do usuário root criado automaticamente | Não |

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<p align="center">Feito com 💚 e organização financeira em mente.</p>
