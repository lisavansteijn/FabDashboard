import { z } from "zod";
// import tryParseEnv from "./lib/db/try-parse-env.ts";
// import { process } from "zod/v4/core";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DB_FILE_NAME: z.string(),
});
export type EnvSchema = z.infer<typeof EnvSchema>;

// tryParseEnv(EnvSchema);

// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
