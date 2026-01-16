<script lang="ts" setup>
const colorMode = useColorMode();

console.log(colorMode);

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate m-2">
    <input v-model="isDark" type="checkbox">
    <icon
      class="swap-on"
      size="32"
      name="tabler:sun-high-filled"
    />
    <icon
      class="swap-off"
      size="32"
      name="tabler:moon-filled"
    />
  </label>
</template>
