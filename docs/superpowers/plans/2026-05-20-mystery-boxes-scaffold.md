# Mystery Boxes Peru — Monorepo Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize a pnpm monorepo with Next.js 14 frontend and Express/TypeScript backend — folder structure, configuration files, installed dependencies, and empty stubs ready for feature development.

**Architecture:** pnpm workspaces with two packages (`frontend`, `backend`) at the repo root. All Next.js pages are single-`<div>` placeholders. All backend controllers/services/middlewares are empty stubs. The only functional backend code is `app.ts` (Express wired up) and `server.ts` (starts on port 4000).

**Tech Stack:** pnpm 8+, Next.js 14 App Router, TypeScript 5 (strict), Tailwind CSS, Framer Motion, Recharts, NextAuth.js, Zod · Express 4, Prisma 5, PostgreSQL, BullMQ, ioredis, pino

> **Note on TDD:** This is a scaffold — there is no business logic to unit-test. The "test" for each section is "the app starts without TypeScript errors." Verification steps replace unit test steps.

---

## File Map

| File | Purpose |
|---|---|
| `pnpm-workspace.yaml` | Declares pnpm workspace packages |
| `package.json` | Root orchestration scripts only |
| `.gitignore` | Global ignores |
| `README.md` | Project overview + setup instructions |
| `frontend/` | Next.js 14 app (bootstrapped via create-next-app) |
| `frontend/src/app/layout.tsx` | Root layout with metadata title |
| `frontend/src/app/page.tsx` | Home placeholder |
| `frontend/src/app/(auth)/login/page.tsx` | Login placeholder |
| `frontend/src/app/(auth)/register/page.tsx` | Register placeholder |
| `frontend/src/app/boxes/page.tsx` | Catalog placeholder |
| `frontend/src/app/boxes/[id]/page.tsx` | Box detail placeholder |
| `frontend/src/app/cart/page.tsx` | Cart placeholder |
| `frontend/src/app/checkout/page.tsx` | Checkout placeholder |
| `frontend/src/app/dashboard/page.tsx` | User profile placeholder |
| `frontend/src/app/admin/layout.tsx` | Admin layout placeholder |
| `frontend/src/app/admin/page.tsx` | Admin dashboard placeholder |
| `frontend/src/app/admin/coupons/page.tsx` | Admin coupons placeholder |
| `frontend/src/app/admin/boxes/page.tsx` | Admin boxes placeholder |
| `frontend/src/components/{ui,layout,boxes,cart,charts}/` | Empty component folders |
| `frontend/src/lib/api.ts` | Exports `API_URL` constant |
| `frontend/src/lib/auth.ts` | NextAuth config stub |
| `frontend/src/lib/utils.ts` | Utilities stub |
| `frontend/src/types/index.ts` | Shared TS types stub |
| `frontend/next.config.js` | images.domains + env pass-through |
| `frontend/tailwind.config.ts` | Extended color palette |
| `frontend/.env.local` | Frontend env vars |
| `backend/package.json` | Scripts + all deps |
| `backend/tsconfig.json` | strict, commonjs, outDir dist |
| `backend/.gitignore` | node_modules, dist, .env, prisma/*.db |
| `backend/.env` | Backend env vars |
| `backend/src/app.ts` | Express app with middlewares (functional) |
| `backend/src/server.ts` | Starts server on PORT 4000 |
| `backend/src/config/env.ts` | Zod env validation |
| `backend/src/config/logger.ts` | pino logger instance |
| `backend/src/config/database.ts` | Prisma client singleton |
| `backend/src/routes/index.ts` | Main router — mounts sub-routers |
| `backend/src/routes/box.routes.ts` | Empty Express Router |
| `backend/src/routes/coupon.routes.ts` | Empty Express Router |
| `backend/src/routes/order.routes.ts` | Empty Express Router |
| `backend/src/routes/user.routes.ts` | Empty Express Router |
| `backend/src/controllers/box.controller.ts` | Empty stub |
| `backend/src/controllers/coupon.controller.ts` | Empty stub |
| `backend/src/controllers/order.controller.ts` | Empty stub |
| `backend/src/controllers/user.controller.ts` | Empty stub |
| `backend/src/services/box.service.ts` | Empty stub |
| `backend/src/services/coupon.service.ts` | Empty stub |
| `backend/src/services/order.service.ts` | Empty stub |
| `backend/src/services/user.service.ts` | Empty stub |
| `backend/src/middlewares/auth.middleware.ts` | Empty stub |
| `backend/src/middlewares/error.middleware.ts` | Empty stub |
| `backend/src/middlewares/validate.middleware.ts` | Empty stub |
| `backend/src/jobs/prize-reveal.job.ts` | BullMQ worker stub |
| `backend/src/types/index.ts` | Shared TS types stub |
| `backend/prisma/schema.prisma` | 7-model Prisma schema |

---

## Task 1: Root monorepo files

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `package.json`
- Create: `.gitignore`
- Create: `README.md` (replaces existing)

- [ ] **Step 1: Create pnpm-workspace.yaml**

```yaml
packages:
  - frontend
  - backend
```

- [ ] **Step 2: Create root package.json**

```json
{
  "name": "mystery-boxes-peru",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter frontend dev & pnpm --filter backend dev",
    "dev:front": "pnpm --filter frontend dev",
    "dev:back": "pnpm --filter backend dev"
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules
.env*
.next
dist
*.db
```

- [ ] **Step 4: Create README.md** (replaces the existing project README)

```markdown
# Mystery Boxes Peru

E-commerce platform for themed mystery boxes (Gamer, Tech, Beauty).

## Stack

- **Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Recharts · NextAuth.js
- **Backend:** Node.js · Express · TypeScript · Prisma ORM
- **Database:** PostgreSQL
- **Queue:** BullMQ + Redis
- **Package manager:** pnpm workspaces

## Prerequisites

- Node.js 18+
- pnpm 8+ (`npm install -g pnpm`)
- PostgreSQL running locally
- Redis running locally

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

**Frontend** — create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXTAUTH_SECRET=change-me-in-production
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Backend** — create `backend/.env`:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mystery_boxes
JWT_SECRET=change-me-in-production
PORT=4000
REDIS_URL=redis://localhost:6379
```

### 3. Run database migration

```bash
pnpm --filter backend prisma:migrate
```

### 4. Start development servers

```bash
pnpm dev           # both in parallel
pnpm dev:front     # frontend only → http://localhost:3000
pnpm dev:back      # backend only  → http://localhost:4000
```
```

- [ ] **Step 5: Commit**

```bash
git add pnpm-workspace.yaml package.json .gitignore README.md
git commit -m "chore: initialize pnpm monorepo root"
```

---

## Task 2: Bootstrap frontend with create-next-app

**Files:**
- Create: `frontend/` (entire Next.js project via create-next-app)

- [ ] **Step 1: Run create-next-app from repo root**

```bash
pnpm create next-app@14 frontend --typescript --tailwind --eslint --app --src-dir --no-git --use-pnpm
```

When prompted "Would you like to customize the default import alias (@/*)?" → press Enter to accept default (`@/*`).

Expected output ends with:
```
✓ Installation complete
```

- [ ] **Step 2: Verify frontend starts**

```bash
pnpm --filter frontend dev
```

Expected: Next.js compiles and server is available at `http://localhost:3000`. No errors in terminal. Stop with Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add frontend
git commit -m "chore: bootstrap frontend with create-next-app@14"
```

---

## Task 3: Install additional frontend dependencies

**Files:**
- Modify: `frontend/package.json` (pnpm adds entries automatically)

- [ ] **Step 1: Install runtime dependencies**

```bash
pnpm --filter frontend add framer-motion recharts next-auth zod
```

Expected: all four packages installed, no peer dependency errors.

- [ ] **Step 2: Commit**

```bash
git add frontend/package.json pnpm-lock.yaml
git commit -m "chore(frontend): add framer-motion, recharts, next-auth, zod"
```

---

## Task 4: Update frontend configuration files

**Files:**
- Modify: `frontend/next.config.js`
- Modify: `frontend/tailwind.config.ts`
- Verify: `frontend/tsconfig.json`
- Create: `frontend/.env.local`

- [ ] **Step 1: Replace next.config.js**

Full contents of `frontend/next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 2: Replace tailwind.config.ts**

Full contents of `frontend/tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
        },
        secondary: {
          DEFAULT: "#EC4899",
          500: "#EC4899",
          600: "#DB2777",
        },
        accent: {
          DEFAULT: "#F59E0B",
          500: "#F59E0B",
        },
        muted: {
          DEFAULT: "#6B7280",
          100: "#F3F4F6",
        },
        background: "#0F0F0F",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify tsconfig.json has @/* alias**

Open `frontend/tsconfig.json` and confirm `compilerOptions.paths` contains:
```json
"@/*": ["./src/*"]
```
`create-next-app@14` adds this by default. If missing, add it manually.

- [ ] **Step 4: Create .env.local**

`frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXTAUTH_SECRET=change-me-in-production
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

- [ ] **Step 5: Commit** (`.env.local` is gitignored — only commit config files)

```bash
git add frontend/next.config.js frontend/tailwind.config.ts frontend/tsconfig.json
git commit -m "chore(frontend): update next.config, tailwind color palette, verify tsconfig alias"
```

---

## Task 5: Update frontend root layout and home page

**Files:**
- Modify: `frontend/src/app/layout.tsx`
- Modify: `frontend/src/app/page.tsx`

- [ ] **Step 1: Replace layout.tsx**

Full contents of `frontend/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Boxes Peru",
  description: "Cajas misteriosas temáticas con sorpresas curadas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Replace page.tsx with placeholder**

Full contents of `frontend/src/app/page.tsx`:

```tsx
export default function HomePage() {
  return <div>Mystery Boxes Peru — Home</div>;
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/app/layout.tsx frontend/src/app/page.tsx
git commit -m "chore(frontend): update root layout metadata and home placeholder"
```

---

## Task 6: Create all frontend route pages

**Files:**
- Create: `frontend/src/app/(auth)/login/page.tsx`
- Create: `frontend/src/app/(auth)/register/page.tsx`
- Create: `frontend/src/app/boxes/page.tsx`
- Create: `frontend/src/app/boxes/[id]/page.tsx`
- Create: `frontend/src/app/cart/page.tsx`
- Create: `frontend/src/app/checkout/page.tsx`
- Create: `frontend/src/app/dashboard/page.tsx`
- Create: `frontend/src/app/admin/layout.tsx`
- Create: `frontend/src/app/admin/page.tsx`
- Create: `frontend/src/app/admin/coupons/page.tsx`
- Create: `frontend/src/app/admin/boxes/page.tsx`

- [ ] **Step 1: Create auth group pages**

`frontend/src/app/(auth)/login/page.tsx`:
```tsx
export default function LoginPage() {
  return <div>Login</div>;
}
```

`frontend/src/app/(auth)/register/page.tsx`:
```tsx
export default function RegisterPage() {
  return <div>Register</div>;
}
```

- [ ] **Step 2: Create box pages**

`frontend/src/app/boxes/page.tsx`:
```tsx
export default function BoxesPage() {
  return <div>Boxes — Catalog</div>;
}
```

`frontend/src/app/boxes/[id]/page.tsx`:
```tsx
export default function BoxDetailPage({ params }: { params: { id: string } }) {
  return <div>Box Detail — {params.id}</div>;
}
```

- [ ] **Step 3: Create transactional pages**

`frontend/src/app/cart/page.tsx`:
```tsx
export default function CartPage() {
  return <div>Cart</div>;
}
```

`frontend/src/app/checkout/page.tsx`:
```tsx
export default function CheckoutPage() {
  return <div>Checkout</div>;
}
```

`frontend/src/app/dashboard/page.tsx`:
```tsx
export default function DashboardPage() {
  return <div>Dashboard — My Profile</div>;
}
```

- [ ] **Step 4: Create admin section**

`frontend/src/app/admin/layout.tsx`:
```tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
```

`frontend/src/app/admin/page.tsx`:
```tsx
export default function AdminDashboardPage() {
  return <div>Admin — Dashboard</div>;
}
```

`frontend/src/app/admin/coupons/page.tsx`:
```tsx
export default function AdminCouponsPage() {
  return <div>Admin — Coupons</div>;
}
```

`frontend/src/app/admin/boxes/page.tsx`:
```tsx
export default function AdminBoxesPage() {
  return <div>Admin — Boxes</div>;
}
```

- [ ] **Step 5: Commit**

```bash
git add frontend/src/app
git commit -m "chore(frontend): add all placeholder route pages"
```

---

## Task 7: Create frontend component folders, lib files, and types

**Files:**
- Create: `frontend/src/components/ui/.gitkeep`
- Create: `frontend/src/components/layout/.gitkeep`
- Create: `frontend/src/components/boxes/.gitkeep`
- Create: `frontend/src/components/cart/.gitkeep`
- Create: `frontend/src/components/charts/.gitkeep`
- Create: `frontend/src/lib/api.ts`
- Create: `frontend/src/lib/auth.ts`
- Create: `frontend/src/lib/utils.ts`
- Create: `frontend/src/types/index.ts`

- [ ] **Step 1: Create empty component folders (tracked via .gitkeep)**

```bash
mkdir -p frontend/src/components/{ui,layout,boxes,cart,charts}
touch frontend/src/components/ui/.gitkeep
touch frontend/src/components/layout/.gitkeep
touch frontend/src/components/boxes/.gitkeep
touch frontend/src/components/cart/.gitkeep
touch frontend/src/components/charts/.gitkeep
```

- [ ] **Step 2: Create lib/api.ts**

`frontend/src/lib/api.ts`:
```ts
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
```

- [ ] **Step 3: Create lib/auth.ts**

`frontend/src/lib/auth.ts`:
```ts
// NextAuth configuration — to be implemented
export {};
```

- [ ] **Step 4: Create lib/utils.ts**

`frontend/src/lib/utils.ts`:
```ts
// Shared utility functions — to be implemented
export {};
```

- [ ] **Step 5: Create types/index.ts**

`frontend/src/types/index.ts`:
```ts
// Shared TypeScript types — to be implemented
export {};
```

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components frontend/src/lib frontend/src/types
git commit -m "chore(frontend): add component folders, lib stubs, and types placeholder"
```

---

## Task 8: Verify frontend starts cleanly

- [ ] **Step 1: Run frontend dev server**

```bash
pnpm --filter frontend dev
```

Expected: Next.js compiles, no TypeScript errors, server on `http://localhost:3000`.

- [ ] **Step 2: Stop the server**

Press Ctrl+C.

---

## Task 9: Initialize backend package and install all dependencies

**Files:**
- Create: `backend/package.json`
- Create: `backend/.gitignore`

- [ ] **Step 1: Initialize backend package.json**

```bash
cd backend && pnpm init && cd ..
```

This creates `backend/package.json` with `"name": "backend"`.

- [ ] **Step 2: Set backend scripts in package.json**

Replace the full contents of `backend/package.json`:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  }
}
```

- [ ] **Step 3: Install runtime dependencies**

```bash
pnpm --filter backend add express cors helmet morgan compression dotenv zod @prisma/client jsonwebtoken bcryptjs bullmq ioredis pino pino-pretty
```

- [ ] **Step 4: Install dev dependencies**

```bash
pnpm --filter backend add -D typescript ts-node tsx prisma @types/express @types/node @types/jsonwebtoken @types/bcryptjs @types/cors @types/morgan @types/compression
```

- [ ] **Step 5: Create backend .gitignore**

`backend/.gitignore`:
```
node_modules
dist
.env
prisma/*.db
```

- [ ] **Step 6: Commit**

```bash
git add backend/package.json backend/.gitignore pnpm-lock.yaml
git commit -m "chore(backend): init package and install all dependencies"
```

---

## Task 10: Configure backend TypeScript

**Files:**
- Create: `backend/tsconfig.json`

- [ ] **Step 1: Create tsconfig.json**

`backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 2: Commit**

```bash
git add backend/tsconfig.json
git commit -m "chore(backend): add TypeScript config"
```

---

## Task 11: Create backend config layer

**Files:**
- Create: `backend/src/config/env.ts`
- Create: `backend/src/config/logger.ts`
- Create: `backend/src/config/database.ts`

- [ ] **Step 1: Create src/config/env.ts**

`backend/src/config/env.ts`:
```ts
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
});

export const env = envSchema.parse(process.env);
```

- [ ] **Step 2: Create src/config/logger.ts**

`backend/src/config/logger.ts`:
```ts
import pino from 'pino';

export const logger = pino(
  process.env.NODE_ENV !== 'production'
    ? { transport: { target: 'pino-pretty' } }
    : {}
);
```

- [ ] **Step 3: Create src/config/database.ts**

`backend/src/config/database.ts`:
```ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
```

- [ ] **Step 4: Commit**

```bash
git add backend/src/config
git commit -m "chore(backend): add config layer (env validation, logger, database)"
```

---

## Task 12: Create backend entry points

**Files:**
- Create: `backend/src/routes/index.ts` (needed by app.ts import)
- Create: `backend/src/app.ts`
- Create: `backend/src/server.ts`
- Create: `backend/.env`

- [ ] **Step 1: Create src/routes/index.ts stub**

`backend/src/routes/index.ts`:
```ts
import { Router } from 'express';

export const router = Router();

// Sub-routers mounted here — see Task 13
```

- [ ] **Step 2: Create src/app.ts**

`backend/src/app.ts`:
```ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { router } from './routes/index';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression() as express.RequestHandler);
app.use(express.json());

app.use('/api/v1', router);

export default app;
```

- [ ] **Step 3: Create src/server.ts**

`backend/src/server.ts`:
```ts
import app from './app';
import { logger } from './config/logger';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

- [ ] **Step 4: Create .env**

`backend/.env`:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mystery_boxes
JWT_SECRET=change-me-in-production
PORT=4000
REDIS_URL=redis://localhost:6379
```

- [ ] **Step 5: Commit** (`.env` is gitignored — only commit source files)

```bash
git add backend/src/app.ts backend/src/server.ts backend/src/routes/index.ts
git commit -m "chore(backend): add functional app.ts and server.ts entry points"
```

---

## Task 13: Create all backend stubs

**Files:**
- Create: `backend/src/routes/box.routes.ts`
- Create: `backend/src/routes/coupon.routes.ts`
- Create: `backend/src/routes/order.routes.ts`
- Create: `backend/src/routes/user.routes.ts`
- Modify: `backend/src/routes/index.ts` (mount sub-routers)
- Create: `backend/src/controllers/box.controller.ts`
- Create: `backend/src/controllers/coupon.controller.ts`
- Create: `backend/src/controllers/order.controller.ts`
- Create: `backend/src/controllers/user.controller.ts`
- Create: `backend/src/services/box.service.ts`
- Create: `backend/src/services/coupon.service.ts`
- Create: `backend/src/services/order.service.ts`
- Create: `backend/src/services/user.service.ts`
- Create: `backend/src/middlewares/auth.middleware.ts`
- Create: `backend/src/middlewares/error.middleware.ts`
- Create: `backend/src/middlewares/validate.middleware.ts`
- Create: `backend/src/jobs/prize-reveal.job.ts`
- Create: `backend/src/types/index.ts`

- [ ] **Step 1: Create route stubs**

`backend/src/routes/box.routes.ts`:
```ts
import { Router } from 'express';

const router = Router();

// TODO: add box routes

export default router;
```

`backend/src/routes/coupon.routes.ts`:
```ts
import { Router } from 'express';

const router = Router();

// TODO: add coupon routes

export default router;
```

`backend/src/routes/order.routes.ts`:
```ts
import { Router } from 'express';

const router = Router();

// TODO: add order routes

export default router;
```

`backend/src/routes/user.routes.ts`:
```ts
import { Router } from 'express';

const router = Router();

// TODO: add user routes

export default router;
```

- [ ] **Step 2: Update routes/index.ts to mount all sub-routers**

Replace the full contents of `backend/src/routes/index.ts`:
```ts
import { Router } from 'express';
import boxRouter from './box.routes';
import couponRouter from './coupon.routes';
import orderRouter from './order.routes';
import userRouter from './user.routes';

export const router = Router();

router.use('/boxes', boxRouter);
router.use('/coupons', couponRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);
```

- [ ] **Step 3: Create controller stubs**

`backend/src/controllers/box.controller.ts`:
```ts
// TODO: implement box controller functions
export {};
```

`backend/src/controllers/coupon.controller.ts`:
```ts
// TODO: implement coupon controller functions
export {};
```

`backend/src/controllers/order.controller.ts`:
```ts
// TODO: implement order controller functions
export {};
```

`backend/src/controllers/user.controller.ts`:
```ts
// TODO: implement user controller functions
export {};
```

- [ ] **Step 4: Create service stubs**

`backend/src/services/box.service.ts`:
```ts
// TODO: implement box service
export {};
```

`backend/src/services/coupon.service.ts`:
```ts
// TODO: implement coupon service
export {};
```

`backend/src/services/order.service.ts`:
```ts
// TODO: implement order service
export {};
```

`backend/src/services/user.service.ts`:
```ts
// TODO: implement user service
export {};
```

- [ ] **Step 5: Create middleware stubs**

`backend/src/middlewares/auth.middleware.ts`:
```ts
// TODO: implement auth middleware
export {};
```

`backend/src/middlewares/error.middleware.ts`:
```ts
// TODO: implement error middleware
export {};
```

`backend/src/middlewares/validate.middleware.ts`:
```ts
// TODO: implement validate middleware
export {};
```

- [ ] **Step 6: Create job stub**

`backend/src/jobs/prize-reveal.job.ts`:
```ts
// TODO: implement BullMQ prize reveal worker
export {};
```

- [ ] **Step 7: Create types stub**

`backend/src/types/index.ts`:
```ts
// TODO: add shared TypeScript types
export {};
```

- [ ] **Step 8: Commit**

```bash
git add backend/src
git commit -m "chore(backend): add all route, controller, service, middleware, and job stubs"
```

---

## Task 14: Create Prisma schema

**Files:**
- Create: `backend/prisma/schema.prisma`

- [ ] **Step 1: Create prisma/schema.prisma with all 7 models**

`backend/prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password_hash String
  role          String   @default("user")
  created_at    DateTime @default(now())

  orders Order[]
}

model Box {
  id          String  @id @default(cuid())
  name        String
  description String
  price       Decimal
  image_url   String?
  theme       String
  rarity      String
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())

  order_items      OrderItem[]
  prize_history    BoxPrizeHistory[]
  coupon_campaigns CouponCampaign[]
}

model Order {
  id          String   @id @default(cuid())
  order_key   String   @unique
  user_id     String?
  guest_email String?
  status      String   @default("pending")
  total       Decimal
  created_at  DateTime @default(now())

  user          User?             @relation(fields: [user_id], references: [id])
  items         OrderItem[]
  coupon_usages CouponUsage[]
  prize_history BoxPrizeHistory[]
}

model OrderItem {
  id         String  @id @default(cuid())
  order_id   String
  box_id     String
  quantity   Int
  unit_price Decimal

  order Order @relation(fields: [order_id], references: [id])
  box   Box   @relation(fields: [box_id], references: [id])
}

model CouponCampaign {
  id                String   @id @default(cuid())
  code              String   @unique
  influencer_name   String
  discount_pct      Decimal
  max_uses          Int
  current_uses      Int      @default(0)
  applicable_box_id String?
  valid_from        DateTime
  valid_until       DateTime
  is_active         Boolean  @default(true)
  created_at        DateTime @default(now())

  applicable_box Box?          @relation(fields: [applicable_box_id], references: [id])
  usages         CouponUsage[]
}

model CouponUsage {
  id           String   @id @default(cuid())
  campaign_id  String
  order_id     String
  user_email   String
  discount_amt Decimal
  used_at      DateTime @default(now())

  campaign CouponCampaign @relation(fields: [campaign_id], references: [id])
  order    Order          @relation(fields: [order_id], references: [id])
}

model BoxPrizeHistory {
  id          String   @id @default(cuid())
  box_id      String
  prize_tier  String
  prize_name  String
  order_id    String
  prize_value Decimal
  revealed_at DateTime @default(now())

  box   Box   @relation(fields: [box_id], references: [id])
  order Order @relation(fields: [order_id], references: [id])
}
```

- [ ] **Step 2: Generate Prisma client**

Make sure `backend/.env` has `DATABASE_URL` set (the template value `postgresql://postgres:postgres@localhost:5432/mystery_boxes` is sufficient for generation even without a running DB).

```bash
pnpm --filter backend prisma:generate
```

Expected: `✔ Generated Prisma Client` in `backend/node_modules/.prisma/client`.

If this step fails with a connection error, verify that `DATABASE_URL` is present in `backend/.env`. The `generate` command does not need a live database — only `migrate` does.

- [ ] **Step 3: Commit**

```bash
git add backend/prisma/schema.prisma
git commit -m "chore(backend): add complete Prisma schema with 7 models"
```

---

## Task 15: Final verification — both apps start without errors

- [ ] **Step 1: Verify backend starts**

```bash
pnpm --filter backend dev
```

Expected pino-pretty output:
```
[HH:MM:SS.mmm] INFO: Server running on port 4000
```

No TypeScript errors in the terminal. Stop with Ctrl+C.

If you see `ZodError: DATABASE_URL: Required`, ensure `backend/.env` exists with `DATABASE_URL` and `JWT_SECRET` set.

- [ ] **Step 2: Verify frontend starts**

```bash
pnpm --filter frontend dev
```

Expected: Next.js compiles with no TypeScript errors, server on `http://localhost:3000`. Stop with Ctrl+C.

- [ ] **Step 3: Verify pnpm workspace installs cleanly**

```bash
pnpm install
```

Expected: dependency resolution completes, no errors.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: complete monorepo scaffold — ready for feature development"
```
