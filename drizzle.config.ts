import { defineConfig } from "drizzle-kit";
import env from "./lib/env.ts";

import "dotenv/config";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema/index.ts",
  dialect: "turso",
  dbCredentials: {
    url: env.NODE_ENV === "development" ? "http://127.0.0.1:8080" : env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
