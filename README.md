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
