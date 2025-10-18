# TTRPG Assistant · Monorepo

**TTRPG Assistant** is a modern, teachable **full-stack** example app for tabletop RPGs.  
It focuses on managing **sessions**, **games**, **characters**, and **parties** with a clean, secure, and extensible architecture.

> **Status:** Auth (register/login) is implemented. Modules and schemas for `users`, `games`, `characters`, `party`, and `session` are scaffolded; CRUD work is planned.

---

## Table of Contents
- [Purpose](#purpose)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Domain Model (Summary)](#domain-model-summary)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Apps](#running-the-apps)
- [Auth Model](#auth-model)
- [Security Notes](#security-notes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Purpose
- A portfolio-friendly project that demonstrates **modern full-stack patterns** with clear separation of concerns and type safety.
- Practical flows for GMs and players: registration/login, game/character/party management, visibility levels.
- **Teachable:** 101-level clarity and modular code that’s easy to extend.

---

## Architecture
- **Web (Next.js 15)** — Forms, modals, list UIs. Communicates with the API via `fetch(..., { credentials: 'include' })`.
- **API (NestJS)** — Modular: `auth`, `users`, `games`, `characters`, `party`, `session`.  
  Protected by **Passport + JWT (RS256)** with **HttpOnly cookies**.
- **Shared Types** — `@repo/types` provides a single source of truth for frontend–backend contracts.

**Ports**
- Web (Next): `http://localhost:3001`  
- API (Nest): `http://localhost:3000`

---

## Features
- **Auth**: Register & Login, passwords hashed with **bcrypt**, **RS256-signed JWT**, **HttpOnly** `acc` cookie.
- **Modularity**: `users`, `games`, `characters`, `party`, `session` — schemas are ready; CRUD is on the roadmap.
- **Type Safety**: Shared public API types via `@repo/types`.
- **DX**: Turborepo, pnpm workspaces, strict TypeScript, ESLint, Prettier.

---

## Tech Stack
- **Frontend:** Next.js 15 (Turbopack), React  
- **Backend:** NestJS, Passport, `@nestjs/jwt`, `passport-jwt`, Mongoose  
- **Auth:** JWT (RS256), HttpOnly cookies, DTO validation (`class-validator`, `class-transformer`)  
- **Monorepo:** Turborepo + pnpm  
- **Language/Tools:** TypeScript, ESLint, Prettier

---

## Domain Model (Summary)
The core public types (shared in `@repo/types`):

- **User**: `_id`, `email`, `username`, `avatar?`, `games?`, `characters?`, `createdAt`, `updatedAt`
- **Game**: `_id`, `title`, `system` (`Generic` | `DND5E` | `Daggerheart` | `PF2`), `description?`, `ownerId`, `partyId?`, `characters?`, `visibility` (`private` | `party` | `public`), `createdAt`
- **Party**: `_id`, `name`, `description?`, `members: User['_id'][]`, timestamps
- **Character**: `_id`, `name`, `ownerId`, optional class/level/race fields, timestamps
- **Session**: `_id`, `name`, `notes?`, `gameId`, timestamps

---

## Repository Structure
```
.
├─ apps/
│  ├─ api/                  # NestJS API (3000)
│  └─ web/                  # Next.js Web (3001)
├─ packages/
│  ├─ types/                # @repo/types (shared API contracts)
│  └─ typescript-config/    # shared tsconfig
├─ secrets/                 # RSA keys (not committed; you create this)
├─ turbo.json
├─ package.json
└─ pnpm-workspace.yaml
```

---

## Getting Started

### 0) Prerequisites
- Node **18+**, pnpm **8+**
- A running **MongoDB** (local or cloud)
- **Windows tip:** keep the repo **outside OneDrive** (e.g., `C:\dev\TTRPG-Assistant`) and enable *Developer Mode* to avoid symlink issues.

### 1) Install dependencies
```bash
pnpm install
```

### 2) Generate RSA keys (RS256 for JWT)
Store keys under `secrets/` (ignored by git):
```bash
mkdir -p secrets
cd secrets
# 4096-bit private key
openssl genrsa -out jwtRS256.key 4096
# public key
openssl rsa -in jwtRS256.key -pubout -out jwtRS256.key.pub
```

Ensure `.gitignore` includes:
```
secrets/
```

---

## Environment Variables

**`apps/api/.env`**
```ini
# Server
PORT=3000
CORS_ORIGIN=http://localhost:3001

# Mongo
MONGO_URI=mongodb://localhost:27017/ttrpg

# JWT (RS256)
JWT_PRIVATE_KEY_PATH=../../secrets/jwtRS256.key
JWT_PUBLIC_KEY_PATH=../../secrets/jwtRS256.key.pub
JWT_EXPIRES_IN=8h
```

**`apps/web/.env.local`**
```ini
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**(Optional) `turbo.json`** — declare client envs for Turborepo caching:
```json
{
  "$schema": "https://turborepo.com/schema.json",
  "globalEnv": ["NEXT_PUBLIC_API_URL", "NODE_ENV"],
  "globalDependencies": ["**/.env.*local", "**/.env"],
  "tasks": {
    "dev": { "cache": false, "persistent": true },
    "build": { "dependsOn": ["^build"], "outputs": [".next/**","!.next/cache/**","dist/**"] },
    "lint": {},
    "test": {},
    "test:e2e": {}
  }
}
```

---

## Running the Apps
From the repo root:
```bash
pnpm dev
# Web: http://localhost:3001
# API: http://localhost:3000
```

Run a single app:
```bash
pnpm --filter ./apps/api dev
pnpm --filter ./apps/web dev
```

---

## Auth Model
- **Register/Login**: On success, the API sets an **HttpOnly** `acc` cookie with an **RS256-signed JWT**.
- **Protected endpoints**: guarded by `@UseGuards(JwtAuthGuard)`. The token is read from the **cookie** (preferred) or `Authorization: Bearer`.
- **Request context**: `JwtStrategy.validate()` attaches `{ id, username }` to `req.user`.  
  Controllers can access it via a small custom decorator such as `@CurrentUser()` (maps to `req.user`).
- **Frontend**: All calls use `fetch(..., { credentials: 'include' })`.  
  Next.js `middleware` can redirect `/app/**` to `/auth` if the `acc` cookie is missing.

> **Planned:** Refresh token flow (HttpOnly `ref` cookie, DB-tracked, rotation on each refresh).

---

## Security Notes
- **HttpOnly** cookie + `SameSite=Lax` (and **`Secure: true`** in production over HTTPS)
- Passwords are hashed with **bcrypt**
- JWT is **RS256** (private key signs, public key verifies)
- DTO + `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`) to reject invalid payloads
- **Never commit keys**; keep them under `secrets/` or in a secret manager

---

## Roadmap
- [x] CRUD for `games`, `characters`, `party`
- [ ] `GET /users/:id` public profile
- [ ] Refresh token (rotation + session management)
- [ ] Roles/permissions (GM, player)
- [ ] Tests (unit / e2e), seed scripts
- [ ] Local HTTPS docs (Caddy/mkcert)
- [ ] UI polish (form validation, modals, state management)

---

## Contributing
1. Fork → feature branch → PR  
2. Keep commits focused  
3. Run `pnpm format` and `pnpm lint` before pushing  
4. Maintain contract consistency with `@repo/types` and mapping functions (e.g., `toPublicUser`)

---

## License
This repository is **source-available** for portfolio review and evaluation.  
Licensed under **PolyForm Strict License 1.0.0** — no production use, redistribution, or modifications.  
See the full text in [`LICENSE`](./LICENSE).
