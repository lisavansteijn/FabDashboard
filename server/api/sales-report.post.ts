import type { DrizzleError } from "drizzle-orm";
import { insertSalesReport } from "~~/lib/db/queries/sales-report";
import { InsertSalesReport } from "~~/lib/db/schema/sales-report";
import defineAuthenticatedEventHandler from "~~/utils/define-authenticated-event-handler";
import { createHash } from "~~/utils/hash";

export default defineAuthenticatedEventHandler(async (event) => {
  // Read the raw body first to see what we're receiving
  // const rawBody = await readBody(event);

  const result = await readValidatedBody(event, body => InsertSalesReport.safeParse(body));

  if (!result.success) {
    console.error("result: ", result.error);
    throw createError({ statusCode: 422, statusMessage: "Invalid request body" });
  }

  try {
    // Create a consistent hash from the unique fields to detect duplicates
    const hash = createHash(result.data);
    return insertSalesReport(result.data, event.context.user.id, hash);
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: sales_report.slug") {
      throw createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the sales report name is used to generate the slug).",
      });
    }
    console.error("error: ", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to insert sales report" });
  }
});
