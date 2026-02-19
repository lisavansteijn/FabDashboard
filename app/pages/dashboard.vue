<script lang="ts" setup>
import { NUXT_PATHS } from "~~/lib/constants";

const route = useRoute();
const isSidebarOpen = ref(true);

/** True when we're on /dashboard/ with no child route (insights, products, trello, etc.). */
const isDashboardIndex = computed(() => route.path === NUXT_PATHS.get("Dashboard"));

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
};
</script>

<template>
  <div class="flex flex-1 h-full">
    <!-- Sidebar -->
    <div class="transition-all duration-600 flex flex-col shrink-0" :class="isSidebarOpen ? 'w-64' : 'w-12'">
      <div
        class="flex flex-row justify-between items-center py-2"
        :class="{ 'justify-center': !isSidebarOpen }"
        @click="toggleSidebar"
      >
        <h4 :class="isSidebarOpen ? 'flex flex-col' : 'hidden'" class="flex-1 flex flex-row items-center ps-3 font-semibold">
          <Icon name="tabler:settings" size="16" />
          <span class="ms-2">Options:</span>
        </h4>
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="24"
          class="my-2 me-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        />
        <Icon
          v-else
          name="tabler:chevron-right"
          size="24"
          class="my-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        />
      </div>

      <div :class="isSidebarOpen ? 'flex flex-col flex-1' : 'hidden'">
        <div class="flex-1">
          <sidebar-button
            label="Sales Insight"
            icon="tabler:chart-bar"
            :href="NUXT_PATHS.get('Insights') ?? ''"
          />
          <sidebar-button
            label="Products"
            icon="tabler:box"
            :href="NUXT_PATHS.get('Products') ?? ''"
          />
          <sidebar-button
            label="Trello"
            icon="tabler:layout"
            :href="NUXT_PATHS.get('Trello') ?? ''"
          />
        </div>
        <div class="w-full mb-4">
          <div class="divider" />
          <sidebar-button
            label="Sign-Out"
            icon="tabler:logout"
            :href="NUXT_PATHS.get('SignOut') ?? ''"
          />
        </div>
      </div>
    </div>
    <!-- dashboard content -->
    <div class="flex-1 bg-base-200">
      <div class="container max-w-4xl mx-auto mt-4 pt-4">
        <AppBreadcrumbs />
        <section v-if="isDashboardIndex">
          <div class="hero bg-linear-65 from-blue-700 to-purple-300 min-h-96 rounded-box">
            <div class="hero-content text-center">
              <div class="max-w-md">
                <h2 class="text-5xl font-semibold mb-2 text-white text-shadow-lg">
                  Welcome to the dashboard!
                </h2>
                <h3 class="text-2xl text-white mb-4 text-shadow-md">
                  What shall we do today…?
                </h3>
                <p class="text-sm text-white mb-4 text-shadow-xs">
                  Choose an option below to get started.
                </p>
                <div class="flex flex-wrap gap-3">
                  <NuxtLink
                    :to="NUXT_PATHS.get('Insights') ?? '#'"
                    class="btn btn-primary gap-2"
                  >
                    <Icon name="tabler:chart-bar" size="20" />
                    Sales Insight
                  </NuxtLink>
                  <NuxtLink
                    :to="NUXT_PATHS.get('Products') ?? '#'"
                    class="btn btn-outline btn-primary gap-2"
                  >
                    <Icon name="tabler:box" size="20" />
                    Products
                  </NuxtLink>
                  <NuxtLink
                    :to="NUXT_PATHS.get('Trello') ?? '#'"
                    class="btn btn-outline btn-primary gap-2"
                  >
                    <Icon name="tabler:layout" size="20" />
                    Trello
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <!-- Optional: annual reminders can go here later -->
            <h4 class="text-2xl font-semibold mb-2 mt-6">
              Optional: Annual Reminders
            </h4>
            <p class="card bg-base-100 w-full shadow-sm p-4 mt-6 text-sm mb-4 text-shadow-xs">
              (To Implement)We'll send you a reminder to review your sales and project management.
            </p>
          </div>
        </section>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
