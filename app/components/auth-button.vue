<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button
    class="btn btn-primary"
    :disabled="authStore.loading"
    @click="authStore.signIn"
  >
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <icon
      v-else
      name="mdi:github"
      size="24"
    />
    Login with GitHub
  </button>
</template>
