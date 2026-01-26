<script lang="ts" setup>
const isSidebarOpen = ref(true);

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
            href="/dashboard/insights"
          />
          <sidebar-button
            label="Products"
            icon="tabler:box"
            href="/dashboard/products"
          />
          <sidebar-button
            label="Trello"
            icon="tabler:layout"
            href="/dashboard/trello"
          />
        </div>
        <div class="w-full mb-4">
          <div class="divider" />
          <sidebar-button
            label="Sign-Out"
            icon="tabler:logout"
            href="/dashboard/sign-out"
          />
        </div>
      </div>
    </div>
    <!-- dashboard content -->
    <div class="flex-1 bg-base-200">
      <NuxtPage />
    </div>
  </div>
</template>
