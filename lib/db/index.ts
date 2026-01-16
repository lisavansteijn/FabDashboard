import { drizzle } from "drizzle-orm/libsql";
import env from "~/lib/env";

import * as schema from "./schema";
// You can specify any property from the libsql connection options
const db = drizzle({
  connection: {
    url: env.DB_FILE_NAME!,
    authToken: undefined, // Undefined because we're just doing a good old local database
  },
  casing: "snake_case",
  schema,
});
export default db;
