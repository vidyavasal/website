# IODE — Database Setup Guide

## Overview

The IODE project uses **NeonDB** (serverless PostgreSQL) with **Drizzle ORM** for type-safe database access.

Two separate Neon projects are configured under the **iode** organization:

| Environment | Project Name       | Project ID              | Region               |
|-------------|-------------------|-------------------------|----------------------|
| **Staging** | `iode-staging`    | `red-brook-90660420`    | `ap-southeast-2`     |
| **Production** | `iode-production` | `quiet-lab-32189697` | `us-east-1`          |

---

## Database Schema

```
universities
    ↓ (one-to-many)
courses
    ↓ (one-to-many)
course_fee_structures
    ↓ (one-to-many)
course_fee_breakdowns
```

Also: `course_categories` (linked to `courses`)

### Tables

| Table                    | Purpose                                    |
|--------------------------|-------------------------------------------|
| `universities`           | University info (name, slug, location)     |
| `course_categories`      | UG, PG, Diploma, MBA, Certificate etc.    |
| `courses`                | Course details with full-text search       |
| `course_fee_structures`  | Fee totals, registration, exam fees        |
| `course_fee_breakdowns`  | Semester/year/installment breakdowns       |

---

## Getting Started

### 1. Environment Variables

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Required variables in `.env.local`:

```env
# Staging database (used for local development)
DATABASE_URL="postgresql://..."

# Production database (used by db:migrate:prod script)
DATABASE_URL_PRODUCTION="postgresql://..."
```

> ⚠️ Never commit `.env.local` — it's already in `.gitignore`.

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify Connection

Open Drizzle Studio to browse your database:

```bash
npm run db:studio
```

---

## Database Commands

| Command              | Description                                      |
|---------------------|--------------------------------------------------|
| `npm run db:generate` | Generate SQL migration from schema changes       |
| `npm run db:migrate`  | Apply pending migrations to **staging** database |
| `npm run db:push`     | Push schema directly (skips migration files)     |
| `npm run db:studio`   | Open Drizzle Studio GUI for database browsing    |
| `npm run db:migrate:prod` | Apply pending migrations to **production**   |

---

## Migration Workflow

### Making Schema Changes

1. **Edit the schema** in `src/lib/db/schema.ts`

2. **Generate a migration**:
   ```bash
   npm run db:generate
   ```
   This creates a new SQL file in `drizzle/` directory.

3. **Apply to staging**:
   ```bash
   npm run db:migrate
   ```

4. **Test on staging** — verify your changes work correctly.

5. **Apply to production**:
   ```bash
   npm run db:migrate:prod
   ```

6. **Commit the migration files** in `drizzle/` to git.

### Quick Push (Development Only)

For rapid iteration during development, you can push schema changes directly without generating migration files:

```bash
npm run db:push
```

> ⚠️ Only use `db:push` on staging. Always use `db:migrate` for production.

---

## Using the Database in Code

### In Server Components

```tsx
import { db } from "@/lib/db";
import { universities } from "@/lib/db/schema";

export default async function UniversitiesPage() {
  const allUniversities = await db.select().from(universities);

  return (
    <ul>
      {allUniversities.map((uni) => (
        <li key={uni.id}>{uni.name}</li>
      ))}
    </ul>
  );
}
```

### In API Routes

```tsx
import { db } from "@/lib/db";
import { courses, universities } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const allCourses = await db
    .select()
    .from(courses)
    .innerJoin(universities, eq(courses.universityId, universities.id));

  return NextResponse.json(allCourses);
}
```

### Type-Safe Inserts

```tsx
import { db } from "@/lib/db";
import { universities, type NewUniversity } from "@/lib/db/schema";

const newUni: NewUniversity = {
  name: "Sikkim Manipal University",
  shortName: "SMU",
  slug: "sikkim-manipal-university",
  universityType: "Private",
};

await db.insert(universities).values(newUni);
```

---

## Neon Branching Strategy

Neon supports database branching (like git branches for your data).

### Current Setup

- **`iode-staging`** → Default branch: `production`
  - Used for local development and staging deployments
  - Schema changes are tested here first

- **`iode-production`** → Default branch: `production`
  - Only receives verified migrations
  - Connected to production deployments

### Deployment Flow

```
Code Change → Edit schema.ts → Generate Migration
    ↓
Apply to Staging → Test → Verify
    ↓
Apply to Production → Deploy
```

For deployment platforms (Vercel, etc.):
- Set `DATABASE_URL` to the **staging** connection string in preview/staging deployments
- Set `DATABASE_URL` to the **production** connection string in production deployments

---

## Project Structure

```
iode/
├── drizzle/                    # Auto-generated migration SQL files
│   └── 0000_abandoned_joseph.sql  # Initial schema migration
├── drizzle.config.ts           # Drizzle Kit configuration
├── src/
│   └── lib/
│       └── db/
│           ├── index.ts        # Database connection (import { db } from "@/lib/db")
│           └── schema.ts       # Drizzle schema definitions & types
├── .env.local                  # Your connection strings (gitignored)
├── .env.example                # Template for other developers
└── docs/
    └── database-setup.md       # This file
```

---

## Neon Console

Manage your databases directly:

- **Staging**: [Neon Console → iode-staging](https://console.neon.tech/app/projects/red-brook-90660420)
- **Production**: [Neon Console → iode-production](https://console.neon.tech/app/projects/quiet-lab-32189697)

---

## Troubleshooting

### "DATABASE_URL is not set"
Copy `.env.example` to `.env.local` and fill in your NeonDB connection string.

### Connection timeout
Neon suspends idle computes. The first query after idle may take ~1 second to wake up. This is normal for serverless PostgreSQL.

### Migration conflicts
If `db:migrate` fails due to conflicts, check:
1. Is the migration file in `drizzle/` up to date?
2. Did someone apply changes directly via Neon console?
3. Run `db:push` to sync schema directly (staging only).
