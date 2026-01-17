import { defineConfig } from "drizzle-kit";

import env from "./lib/env.ts";
import "dotenv/config";

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_FILE_NAME!,
  },
});
