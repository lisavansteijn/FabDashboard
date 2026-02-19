import { createAuthClient } from "better-auth/vue";
import { NUXT_PATHS } from "~~/lib/constants";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: NUXT_PATHS.get("Dashboard") as string,
        // errorCallbackURL: NUXT_PATHS.get("Error") as string,
        fetchOptions: {
          headers,
          // Trigger default error handling.
          onError: (ctx) => {
            throw createError({
              statusCode: ctx.error.status || 500,
              statusMessage: ctx.error.statusText || "Unknown error",
              message: ctx.error.message || "An unknown error occurred",
            });
          },
        },
      },

    );
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo(NUXT_PATHS.get("Home") as string);
  }

  return {
    init,
    loading,
    signIn,
    user,
    signOut,
  };
});
