## Clean Architecture TODO API (Drizzle ORM)

A production-ready TODO API built using Clean Architecture principles with Drizzle ORM, PostgreSQL, Express, TypeScript, and Zod.

### 🚀 Features

- 🧱 Clean Architecture (layered structure)
- ⚡ Drizzle ORM (type-safe SQL)
- 🛢️ PostgreSQL database
- 🧪 Zod validation (type-safe request validation)
- 🔄 CRUD operations for TODOs
- 📦 Modular and scalable folder structure
- 🕒 Auto timestamps (createdAt, updatedAt)

### 🛠️ Tech Stack

- Backend: Node.js, Express
- Language: TypeScript
- ORM: Drizzle ORM
- Database: PostgreSQL
- Validation: Zod

<pre>
TODO_TS/
├── node_modules/
├── src/
│   ├── app/
│   │   └── todo/
│   │       ├── route.ts
│   │       ├── todo.controller.ts
│   │       ├── todo.schema.ts
│   │       ├── todo.service.ts
│   │   └── app.ts
│   │
│   ├── db/
│   │   ├── db.ts
│   │   └── schema.ts
│   │
│   ├── utils/
│   │   ├── apiError.ts
│   │   ├── apiResponse.ts
│   |──index.ts
│
├── .env
├── .gitignore
├── docker-compose.yml
├── drizzle.config.js
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
</pre>
