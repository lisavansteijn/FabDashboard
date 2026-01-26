<script lang="ts" setup>
const seoStore = useSEOStore();
const route = useRoute();

useSeoMeta({
  title: seoStore.getSEO?.title,
  description: seoStore.getSEO?.description,
  ogTitle: seoStore.getSEO?.title,
  ogDescription: seoStore.getSEO?.description,
  ogImage: "/favicon.png",
  ogUrl: route.fullPath,
  twitterTitle: seoStore.getSEO?.title,
  twitterImage: "/favicon.png",
  twitterDescription: seoStore.getSEO?.description,
  // twitterImage: seoStore.getSEO?.image,
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
