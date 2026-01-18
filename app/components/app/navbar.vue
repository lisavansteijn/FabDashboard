<template>
  <nav class="navbar bg-primary bg-base-100 shadow-sm">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl"><nuxt-link to="/">The Fab(ulous) Dashboard</nuxt-link></a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <!-- Navigation Menu -->
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink :to="{ name: 'trello-board' }">
            Trello Board
          </NuxtLink>
        </li>
        <li>
          <details>
            <summary>Sales Insight</summary>
            <ul class="p-2 bg-base-100 w-40 z-1">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>Item 3</a></li>
      </ul>
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
