# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install
```

If you want to setup the database, use:
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate 
(or use my function: pnpm migrate)

(or if you dare doing this locally:)
pnpm drizzle-kit push
```
- Note: use the same commands if you are updating your schemas!

To check if your schemas came in correctly, simply:

```bash
pnpm drizzle-kit studio
```
and it will show a webpage showcasing your tables :)

To


## Development Server

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

## Production

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

# When committing:
A couple of things to note when committing:
1. Currently the project is using Husky, which means that you'll get lint errors. You may run "pnpm lint:fix" to solve it.

