import { auth } from "../../lib/auth";

// Middleware to protect /dashboard routes
export default defineEventHandler(async (event) => {
  if (event.path.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });
    if (!session) {
      await sendRedirect(event, "/", 302);
    }
  }
});
