# Mystery Boxes Peru — Monorepo Scaffold Design

**Date:** 2026-05-20  
**Scope:** Initial project scaffold only — folder structure, configuration files, installed dependencies, and empty/minimal base files ready for feature development. No business logic, no functional endpoints, no UI components.

---

## 1. Repository Root

**Location:** `Comercio_Lab/` (this repo IS the monorepo root)

**Package manager:** pnpm workspaces

```
Comercio_Lab/
├── pnpm-workspace.yaml   → packages: [frontend, backend]
├── package.json          → scripts only (dev, dev:front, dev:back)
├── .gitignore            → node_modules, .env*, .next, dist, *.db
└── README.md             → project overview, stack, setup instructions
```

Root `package.json` scripts:
```json
{
  "scripts": {
    "dev":       "pnpm --filter frontend dev & pnpm --filter backend dev",
    "dev:front": "pnpm --filter frontend dev",
    "dev:back":  "pnpm --filter backend dev"
  }
}
```

---

## 2. Frontend — Next.js 14 (App Router)

### Bootstrap
`create-next-app@14` with flags: `--typescript --tailwind --eslint --app --src-dir`

### Additional dependencies
```
framer-motion   recharts   next-auth   zod
```

### App Router pages (all placeholder — `export default function X() { return <div>X</div> }`)

| URL | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/login` | `src/app/(auth)/login/page.tsx` |
| `/register` | `src/app/(auth)/register/page.tsx` |
| `/boxes` | `src/app/boxes/page.tsx` |
| `/boxes/[id]` | `src/app/boxes/[id]/page.tsx` |
| `/cart` | `src/app/cart/page.tsx` |
| `/checkout` | `src/app/checkout/page.tsx` |
| `/dashboard` | `src/app/dashboard/page.tsx` |
| `/admin` | `src/app/admin/page.tsx` |
| `/admin` layout | `src/app/admin/layout.tsx` |
| `/admin/coupons` | `src/app/admin/coupons/page.tsx` |
| `/admin/boxes` | `src/app/admin/boxes/page.tsx` |

Root layout: `src/app/layout.tsx` with base `<html>` structure and metadata (`title: "Mystery Boxes Peru"`).

### Component folders (empty — will be populated during feature development)
```
src/components/ui/
src/components/layout/
src/components/boxes/
src/components/cart/
src/components/charts/
```

### Lib files
| File | Content |
|---|---|
| `src/lib/api.ts` | `export const API_URL = process.env.NEXT_PUBLIC_API_URL \|\| "http://localhost:4000/api/v1"` |
| `src/lib/auth.ts` | Empty — NextAuth config placeholder |
| `src/lib/utils.ts` | Empty — utility functions placeholder |

### Types
`src/types/index.ts` — empty, for shared TypeScript types

### Configuration files
- **`next.config.js`** — `images.domains: []`, exposes env vars
- **`tailwind.config.ts`** — extends colors: `primary`, `secondary`, `accent`, `muted`, `background`
- **`tsconfig.json`** — `strict: true`, path alias `@/*` → `./src/*`
- **`.env.local`** — variables:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=http://localhost:3000
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  ```

---

## 3. Backend — Node.js + Express + TypeScript

### Dependencies

**Runtime:**
```
express  cors  helmet  morgan  compression  dotenv  zod
prisma  @prisma/client
jsonwebtoken  bcryptjs
bullmq  ioredis
pino  pino-pretty
```

**Dev:**
```
typescript  ts-node  tsx
@types/express  @types/node  @types/jsonwebtoken  @types/bcryptjs
```

### Entry points

**`src/app.ts`** — functional Express app:
- Applies `cors`, `helmet`, `morgan`, `compression`, `express.json()`
- Mounts router at `/api/v1`
- Exports `app`

**`src/server.ts`** — starts the server:
- Imports `app`, listens on `PORT` (default 4000)
- Logs startup message via pino

### Source structure

```
src/
├── app.ts
├── server.ts
├── config/
│   ├── env.ts          → Zod schema to load & validate env vars
│   ├── database.ts     → Prisma client singleton (empty)
│   └── logger.ts       → pino instance export
├── middlewares/
│   ├── auth.middleware.ts      → empty export
│   ├── error.middleware.ts     → empty export
│   └── validate.middleware.ts  → empty export
├── routes/
│   ├── index.ts        → main router, mounts sub-routers under /api/v1
│   ├── box.routes.ts   → empty Router
│   ├── coupon.routes.ts
│   ├── order.routes.ts
│   └── user.routes.ts
├── controllers/
│   ├── box.controller.ts       → empty function stubs (// TODO)
│   ├── coupon.controller.ts
│   ├── order.controller.ts
│   └── user.controller.ts
├── services/
│   ├── box.service.ts          → empty
│   ├── coupon.service.ts
│   ├── order.service.ts
│   └── user.service.ts
├── jobs/
│   └── prize-reveal.job.ts     → empty BullMQ worker stub
└── types/
    └── index.ts                → empty
```

### Prisma schema (`prisma/schema.prisma`)

Provider: `postgresql`  
URL: `env("DATABASE_URL")`

**7 models:**

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String
  password_hash String
  role          String   @default("user")
  created_at    DateTime @default(now())
  orders        Order[]
}

model Box {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Decimal
  image_url   String?
  theme       String
  rarity      String
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  order_items       OrderItem[]
  prize_history     BoxPrizeHistory[]
  coupon_campaigns  CouponCampaign[]
}

model Order {
  id          String      @id @default(cuid())
  order_key   String      @unique
  user_id     String?
  user        User?       @relation(fields: [user_id], references: [id])
  guest_email String?
  status      String      @default("pending")
  total       Decimal
  created_at  DateTime    @default(now())
  items         OrderItem[]
  coupon_usages CouponUsage[]
  prize_history BoxPrizeHistory[]
}

model OrderItem {
  id         String  @id @default(cuid())
  order_id   String
  order      Order   @relation(fields: [order_id], references: [id])
  box_id     String
  box        Box     @relation(fields: [box_id], references: [id])
  quantity   Int
  unit_price Decimal
}

model CouponCampaign {
  id               String    @id @default(cuid())
  code             String    @unique
  influencer_name  String
  discount_pct     Decimal
  max_uses         Int
  current_uses     Int       @default(0)
  applicable_box_id String?
  applicable_box    Box?     @relation(fields: [applicable_box_id], references: [id])
  valid_from       DateTime
  valid_until      DateTime
  is_active        Boolean   @default(true)
  created_at       DateTime  @default(now())
  usages           CouponUsage[]
}

model CouponUsage {
  id           String         @id @default(cuid())
  campaign_id  String
  campaign     CouponCampaign @relation(fields: [campaign_id], references: [id])
  order_id     String
  order        Order          @relation(fields: [order_id], references: [id])
  user_email   String
  discount_amt Decimal
  used_at      DateTime       @default(now())
}

model BoxPrizeHistory {
  id          String   @id @default(cuid())
  box_id      String
  box         Box      @relation(fields: [box_id], references: [id])
  prize_tier  String
  prize_name  String
  order_id    String
  order       Order    @relation(fields: [order_id], references: [id])
  revealed_at DateTime @default(now())
  prize_value Decimal
}
```

### Backend configuration files

- **`tsconfig.json`** — `strict: true`, `outDir: dist`, `rootDir: src`, path alias `@/*`
- **`package.json`** scripts:
  ```json
  "dev":              "tsx watch src/server.ts",
  "build":            "tsc",
  "start":            "node dist/server.js",
  "prisma:generate":  "prisma generate",
  "prisma:migrate":   "prisma migrate dev"
  ```
- **`.env`** — variables:
  ```
  DATABASE_URL=postgresql://user:password@localhost:5432/mystery_boxes
  JWT_SECRET=
  PORT=4000
  REDIS_URL=redis://localhost:6379
  ```
- **`.gitignore`** — `node_modules`, `dist`, `.env`, `prisma/*.db`

---

## 4. What this scaffold does NOT include

- No business logic in services or controllers (only `// TODO` stubs)
- No UI components with real JSX (only single-`<div>` placeholders)
- No authentication flows wired up
- No payment integration
- No seed data

---

## 5. Verification

After scaffolding, both apps must start without errors:
- `pnpm --filter frontend dev` → Next.js dev server on port 3000
- `pnpm --filter backend dev` → Express server on port 4000, log: `"Server running on port 4000"`
