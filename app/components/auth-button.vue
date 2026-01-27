<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div
    v-if="authStore.loading === false && authStore.user"
    class="dropdown dropdown-end dropdown-hover"
  >
    <div
      tabindex="0"
      role="button"
      class="m-1"
    >
      {{ authStore.user.name }}
      <div v-if="authStore.user.image" class="avatar">
        <div class="w-10 rounded-full">
          <img :src="authStore.user.image" :alt="authStore.user.name">
        </div>
      </div>
    </div>
    <ul tabindex="-1" class="menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <NuxtLink to="/dashboard/sign-out">
          <Icon name="tabler:logout-2" size="24" />
          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>

  <button
    v-else
    class="btn bg-black text-white border-black"
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
