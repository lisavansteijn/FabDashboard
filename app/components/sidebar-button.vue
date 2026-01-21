<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
}>();

const route = useRoute();
</script>

<template>
  <NuxtLink
    :to="props.href"
    :class="{ 'bg-primary/50': route.path === props.href }"
    class="flex justify-start gap-2 ps-4 py-2 hover:bg-secondary/70 hover:cursor-pointer"
  >
    <Icon :name="props.icon" size="24" />
    {{ props.label }}
  </NuxtLink>
</template>
