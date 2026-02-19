# The Fab(ulous) Dashboard

A dashboard for displaying your Fab store sales insights with a clear, modern experience. Upload a CSV, view trends and charts, and manage products—all behind GitHub sign-in.

**Live:** https://fab-dashboard-beryl.vercel.app/

---

## Features

- **Authentication** — GitHub OAuth via [better-auth](https://www.better-auth.com/)
- **Sales insights** — CSV upload, per-user reports, and charts (revenue, sales, license type) at `/dashboard/insights/[userid]/`
- **User-scoped routes** — Insights URLs include the signed-in user’s ID; invalid or tampered IDs show a 403 error
- **Dashboard home** — Welcome view with quick links (Sales Insight, Products, Trello) when no sub-route is active
- **Products** — Product-related views (placeholder for future expansion)
- **Trello-style board** — Task/board UI under `/dashboard/trello/`
- **Error handling** — Global error page (e.g. 403 Forbidden) and auth error page at `/error/`
- **Theme** — Nuxt UI, DaisyUI, Tailwind CSS, color mode support

---

## Tech stack

- **Nuxt 4** — Vue 3, SSR-capable
- **Pinia** — State (auth, SEO)
- **better-auth** — Session + GitHub provider, Drizzle adapter
- **Drizzle ORM** — SQLite (local / Turso)
- **Nuxt UI, nuxt-charts (vue-chrts), nuxt-csurf** — UI, charts, CSRF

---

## Project layout

```
FabDashboard/
├── app/
│   ├── app.vue                 # Root layout (UApp, NuxtLayout, NuxtPage)
│   ├── error.vue                # Global error page (403, 5xx, etc.)
│   ├── assets/css/              # Base + main styles
│   ├── components/              # Reusable UI (navbar, sidebar-button, modal, etc.)
│   ├── composables/             # e.g. use-has-sales-report
│   ├── compositions/           # useInsights (CSV state, etc.)
│   ├── layouts/
│   │   └── default.vue         # SEO meta, auth init, navbar
│   ├── middleware/
│   │   └── insights-redirect.global.ts  # Redirect /dashboard/insights/ → /dashboard/insights/[userId]/; 403 on wrong user
│   ├── pages/
│   │   ├── index.vue           # Home / landing
│   │   ├── error.vue           # Auth/error route at /error/
│   │   ├── dashboard.vue       # Dashboard shell (sidebar + welcome or NuxtPage)
│   │   ├── dashboard/insights.vue       # CSV upload + insights entry
│   │   ├── dashboard/insights/[userid].vue  # Sales report charts
│   │   ├── dashboard/products.vue
│   │   ├── dashboard/trello.vue
│   │   └── dashboard/sign-out.vue
│   └── stores/
│       ├── auth.ts             # Session, signIn/signOut, user
│       └── SEO.ts              # SEO meta by route (path-based)
├── lib/
│   ├── auth.ts                 # better-auth config (Drizzle, GitHub)
│   ├── constants.ts            # NUXT_PATHS, buildUserInsightsPath, CSV types
│   ├── db/                     # Drizzle schema + queries (auth, sales-report, product)
│   ├── env.ts                  # Env validation
│   └── uploads/                # CSV schema (e.g. cv-schema)
├── server/
│   ├── api/
│   │   ├── [...auth].ts        # better-auth API
│   │   ├── sales-report.get.ts # GET aggregated insights (per user)
│   │   ├── sales-report.post.ts# POST CSV data
│   │   └── tasks.get.ts
│   └── middleware/
│       └── auth.ts             # Attach user to context; redirect unauthenticated /dashboard to /
├── utils/                      # e.g. define-authenticated-event-handler
├── drizzle.config.ts
├── nuxt.config.ts
└── package.json
```

Routes (trailing slashes): `/`, `/dashboard/`, `/dashboard/insights/[userid]/`, `/dashboard/products/`, `/dashboard/trello/`, `/dashboard/sign-out/`, `/error/`.

---

## Setup

### Install dependencies

```bash
pnpm install
```

### Environment

Configure auth (e.g. GitHub OAuth) and any DB/config in `.env` (see `lib/env.ts`). Run the app:

```bash
pnpm run dev
```

---

## Database (SQLite / Turso)

Local development can use Turso CLI with a file-backed DB.

**On Windows:** use WSL and open the WSL terminal for Turso.

```bash
# Start local DB (WSL if applicable)
turso dev --db-file local.db

# In another terminal: generate and run migrations
pnpm migrate
# or: pnpm drizzle-kit generate && pnpm drizzle-kit migrate
```

Inspect data:

```bash
pnpm check:database
# or: pnpm drizzle-kit studio
```

Or use a SQLite viewer (e.g. VS Code extension). After changing migrations, rerun `pnpm dev` if needed.

---

## Scripts

| Command              | Description                    |
|----------------------|--------------------------------|
| `pnpm dev`           | Start dev server               |
| `pnpm build`         | Production build               |
| `pnpm dev:db`        | Start Turso with `local.db`    |
| `pnpm migrate`       | Generate + run Drizzle migrations |
| `pnpm check:database`| Open Drizzle Studio           |
| `pnpm lint`          | Run ESLint                     |
| `pnpm lint:fix`      | Fix lint issues                |

---

## Committing

- The project uses **Husky** and **lint-staged**; commits run the linter.
- Fix lint with `pnpm lint:fix` or resolve issues manually.

---

## Docs

- [Nuxt](https://nuxt.com/docs)
- [better-auth](https://www.better-auth.com/)
- [Drizzle](https://orm.drizzle.team/)
