import { buildUserInsightsPath, NUXT_PATHS } from "~~/lib/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path;
  const insightsBase = NUXT_PATHS.get("Insights") as string;
  if (!path.startsWith(insightsBase)) {
    return;
  }

  const authStore = useAuthStore();
  await authStore.init();

  const currentUserId = authStore.user?.id;
  if (currentUserId == null) {
    return navigateTo(NUXT_PATHS.get("Home") as string, { replace: true });
  }

  const pathUserId = to.params.userid as string | undefined;
  const isOwnInsightsPage = pathUserId !== undefined && String(currentUserId) === pathUserId;
  const userInsightsPath = buildUserInsightsPath(currentUserId);

  if (path === insightsBase) {
    return navigateTo(userInsightsPath, { replace: true });
  }

  if (!isOwnInsightsPage) {
    return abortNavigation(
      createError({
        statusCode: 403,
        statusMessage: "Forbidden",
        message: "You do not have access to this page. The user ID in the URL does not match your account.",
      }),
    );
  }
});
