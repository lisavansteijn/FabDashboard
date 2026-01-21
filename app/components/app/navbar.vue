<template>
  <nav class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <nuxt-link to="/" class="btn btn-ghost text-xl">
        The Fab(ulous) Dashboard
      </nuxt-link>
    </div>
    <div class="navbar-end">
      <!-- Dark Mode Toggle Placeholder -->
      <AppThemeToggler />

      <div>
        <AuthButton />
      </div>
    </div>
  </nav>
</template>
