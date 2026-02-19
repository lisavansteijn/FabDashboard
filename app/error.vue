<script lang="ts" setup>
import { NUXT_PATHS } from "~~/lib/constants";

const error = useError();
const statusCode = computed(() => error.value?.statusCode ?? 500);
const message = computed(() => error.value?.message ?? "An unexpected error occurred.");
const statusText = computed(() => error.value?.statusMessage ?? "Error");

function goHome() {
  clearError({ redirect: NUXT_PATHS.get("Home") as string });
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-base-200">
    <div class="card bg-base-100 shadow-lg max-w-md w-full overflow-hidden">
      <div class="card-body">
        <div
          role="alert"
          class="alert"
          :class="statusCode === 403 ? 'alert-error' : 'alert-warning'"
        >
          <Icon name="tabler:alert-circle" size="28" />
          <div class="flex flex-col gap-1">
            <span class="font-semibold">
              {{ statusCode }} – {{ statusText }}
            </span>
          </div>
        </div>
        <p class="text-sm text-base-content/70 mt-2">
          {{ message }}
        </p>
        <p class="text-sm text-base-content/70 mt-2">
          You can go back to the home page or dashboard and try again.
        </p>
        <div class="card-actions justify-end gap-2 mt-2">
          <NuxtLink to="/dashboard/" class="btn btn-primary">
            Dashboard
          </NuxtLink>
          <button
            type="button"
            class="btn btn-ghost"
            @click="goHome"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
