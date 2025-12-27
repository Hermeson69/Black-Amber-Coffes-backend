# Black Ember Coffee Backend

Backend em Node/Express com Drizzle ORM e Turso/LibSQL para o gerenciamento de clientes, pedidos, itens e pagamentos da cafeteria Black Ember.

## Stack rápida

- Runtime: Node.js (CommonJS) com `tsx` para rodar TypeScript sem build
- Framework: Express 5
- ORM: Drizzle (sqlite/libsql)
- Auth/utils: bcrypt para hash de senha, `uuidv7` para IDs

## Como rodar

1. Instale deps: `npm install`
2. Configure a variável `DB_URL` no ambiente (Turso/LibSQL).
3. Gere migrations/DB (opcional enquanto dev): `npm run migrate-new` / `npm run migrate-up`
4. Suba o servidor: `npm start` (roda `tsx src/server.ts`)
5. Health check: `GET /` responde `{ ok: true }`

## Estrutura

- `src/server.ts`: bootstrap Express e JSON parsing
- `src/db/schema.ts`: tabelas de clientes, colaboradores, pedidos, itens, pagamentos e itens do pedido (`status` usa enum em `core/enums/orederStatus.ts`)
- `src/db/index.ts`: client Drizzle + schema
- `src/utils/security.ts`: hash e compare de senha (bcrypt)
- `src/utils/gereteId.ts`: geração de IDs uuidv7
- Pastas para evoluir: `routes/`, `contrllers/`, `services/`, `models/`, `schemas/`, `core/`

## Ordem de criação dos arquivos nessa arquitetura
- Fazer tudo relacionado ao banco primeiro: tabelas em `db/schema.ts`, client em `db/index.ts`
- Depois os modelos em `schemas/` (validação com Zod) e `models/` (tipos e interações com o DB)
- Depois os repositorios em `repositories/` (funções CRUD usando os modelos)
- Depois os serviços em `services/` (lógica de negócio usando os repositórios)
- Depois os controladores em `controllers/` (funções Express que chamam os serviços)
- Depois as rotas em `routes/` (definição dos endpoints que chamam os controladores)
- Finalmente, integrar as rotas no `server.ts` 


## Rotas básicas planejadas

- Health: `GET /`
- Clientes: `POST /clients`, `GET /clients/:id`, `PATCH /clients/:id`, `DELETE /clients/:id`
- Colaboradores: `POST /workers`, `GET /workers/:id`, `PATCH /workers/:id`, `DELETE /workers/:id`
- Itens: `POST /items`, `GET /items`, `GET /items/:id`, `PATCH /items/:id`, `DELETE /items/:id`
- Pedidos: `POST /orders`, `GET /orders/:id`, `PATCH /orders/:id` (status: PENDING | IN_PROGRESS | COMPLETED | CANCELLED)
- Pagamentos: `POST /orders/:id/payments`, `GET /orders/:id/payments`

## Scripts úteis

- `npm start`: inicia com `tsx src/server.ts`
- `npm run dev`: equivalente ao start
- `npm run build`: `tsc` para gerar `dist/` (não obrigatório para rodar)
- `npm run migrate-new`: gerar nova migration via drizzle-kit
- `npm run migrate-up`: aplicar migrations
