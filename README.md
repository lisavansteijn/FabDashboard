# The Fab(ulous) dashboard!
Looking for a way to display your fab store sales insights into a much better experience? Then look no further!

The dashboard is tailored to show specific details from your imported CSV file. It contains the following features:

- Generic sales insights
- Insightful trends over the months
- A trello board!

See the live version here: https://fab-dashboard-beryl.vercel.app/

# Programmer stuff:

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install
```

### Making changes to the (local) database? Do the following:

*(If on windows, get WSL and open the WSL terminal)*
- Make sure to have Turso CLI installed!

```bash
(in WSL if applicable:)
turso dev --db-file local.db

pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Done! To check if your tables were generated/migrated succesfully:

```bash
pnpm drizzle-kit studio
```

Or get the SQLite viewer in VS code extensions for easier access 😉!

**Note:** If you made migrations, *rerun the nuxt dev build with pnpm run dev*

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## When committing:
A couple of things to note when committing:
1. Currently the project is using Husky, which means that you'll get lint errors. You may run "pnpm lint:fix" to solve it.

