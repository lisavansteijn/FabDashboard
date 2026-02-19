<script lang="ts" setup>
const seoStore = useSEOStore();
const route = useRoute();
const seo = computed(() => seoStore.getSEO(route.path));

useSeoMeta({
  title: computed(() => seo.value?.title),
  description: computed(() => seo.value?.description),
  ogTitle: computed(() => seo.value?.title),
  ogDescription: computed(() => seo.value?.description),
  ogImage: "/favicon.png",
  ogUrl: route.fullPath,
  twitterTitle: computed(() => seo.value?.title),
  twitterImage: "/favicon.png",
  twitterDescription: computed(() => seo.value?.description),
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});

// Initialize auth store on layout load
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>
