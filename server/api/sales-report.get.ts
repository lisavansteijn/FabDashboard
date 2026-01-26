import { getSalesInsights } from "~~/lib/db/queries/sales-report";
import defineAuthenticatedEventHandler from "~~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return await getSalesInsights(event.context.user.id);
});
