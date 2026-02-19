import type { UserWithId } from "~~/lib/auth";
import { auth } from "~~/lib/auth";
import { NUXT_PATHS } from "~~/lib/constants";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;
  const dashboard = NUXT_PATHS.get("Dashboard") as string;
  if (event.path.startsWith(dashboard)) {
    if (!session?.user) {
      await sendRedirect(event, NUXT_PATHS.get("Home") as string, 302);
    }
  }
});
