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

### Project Structure

<pre>
TODO_TS/
├── dist/                         # Compiled JavaScript output (from TypeScript)
├── drizzle/                      # Drizzle migration files and metadata
├── node_modules/                 # Project dependencies
├── src/                          # Source code
│   ├── app/                      # Application layer (feature modules)
│   │   ├── todo/                 # Todo feature module
│   │   │   ├── route.ts          # Express routes for todo endpoints
│   │   │   ├── todo.controller.ts# Handles HTTP requests/responses
│   │   │   ├── todo.schema.ts    # Zod validation schemas
│   │   │   └── todo.service.ts   # Business logic for todos
│   │   └── app.ts                # Express app configuration (middlewares, routes)
│   ├── db/                       # Database layer
│   │   ├── db.ts                 # Database connection setup
│   │   └── schema.ts             # Drizzle table schema definitions
│   ├── middleware/               # Global middlewares
│   │   ├── error.middleware.ts   # Centralized error handling middleware
│   │   └── logger.ts             # Request logging middleware
│   ├── utils/                    # Reusable utilities
│   │   ├── apiError.ts           # Custom error class (ApiError)
│   │   ├── apiResponse.ts        # Standard API response formatter
│   │   └── asyncHandler.ts       # Wrapper to handle async errors
│   └── index.ts                  # Application entry point (server bootstrap)
├── .env                          # Environment variables
├── .gitignore                    # Files/folders ignored by git
├── docker-compose.yml            # Docker setup for services (e.g., DB)
├── drizzle.config.js             # Drizzle ORM configuration
├── package.json                  # Project metadata and scripts
├── pnpm-lock.yaml                # Dependency lock file (pnpm)
├── README.md                     # Project documentation
└── tsconfig.json                 # TypeScript configuration
</pre>
