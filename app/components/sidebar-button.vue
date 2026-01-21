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
    class="flex justify-start m-2 gap-2 ps-4 py-2 btn btn-ghost hover:bg-secondary/70"
  >
    <Icon :name="props.icon" size="24" />
    {{ props.label }}
  </NuxtLink>
</template>
