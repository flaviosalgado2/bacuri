# Bacuri

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt-4.x-00C58E?logo=nuxt.js&logoColor=white" alt="Nuxt 4" />
  <img src="https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-18.x-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
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

| Camada | Tecnologia |
|--------|------------|
| Framework frontend / full-stack | [Nuxt 4](https://nuxt.com/) |
| UI framework | [Vue 3](https://vuejs.org/) + [Nuxt UI](https://ui.nuxt.com/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Banco de dados | [PostgreSQL](https://www.postgresql.org/) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) + Drizzle Kit |
| Driver PostgreSQL | [pg](https://www.npmjs.com/package/pg) |
| Autenticação | [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils) |
| Validação | [Zod](https://zod.dev/) |
| Testes | [Vitest](https://vitest.dev/) + [@nuxt/test-utils](https://test-utils.nuxtjs.org/) |
| Containerização | [Docker](https://www.docker.com/) + Docker Compose |

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

```
bacuri/
├── app/                    # Aplicação Nuxt (Vue)
│   ├── components/         # Componentes Vue reutilizáveis
│   ├── composables/        # Composables (autenticação, contas)
│   ├── layouts/            # Layouts da aplicação
│   ├── middleware/         # Middlewares de rota (logado, visitante)
│   ├── pages/              # Páginas e rotas
│   └── assets/             # CSS e recursos estáticos
├── server/                 # API e lógica do servidor (Nitro)
│   ├── api/                # Endpoints da API
│   ├── db/                 # Schema e migrations do Drizzle
│   ├── plugins/            # Plugins do Nitro (init, migrations)
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
