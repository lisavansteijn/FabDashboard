<script lang="ts" setup>
const route = useRoute();

// TODO: use better logic to check if route actually exists and has content.
const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  return matchedRoutes.map(route => ({
    label: route.name?.toString().split("-").pop(), // get the last part of the name, as route.name is like "dashboard-insights"
    href: route.path,
  }));
});
</script>

<template>
  <div class="breadcrumbs text-sm mb-3">
    <ul>
      <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.label">
        <NuxtLink :to="breadcrumb.href">
          {{ breadcrumb.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
