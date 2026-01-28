import z from "zod";
import { insertSalesReports } from "~~/lib/db/queries/sales-report";
import { InsertSalesReport } from "~~/lib/db/schema/sales-report";
import defineAuthenticatedEventHandler from "~~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, body =>
    z.array(InsertSalesReport).safeParse(body));

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: "Invalid request body: Expected an array of sales reports",
    });
  }
  // Send the whole array at once
  const inserted = await insertSalesReports(result.data, event.context.user.id);

  return {
    count: inserted.length,
    message: "Upload processed successfully",
  };
});
