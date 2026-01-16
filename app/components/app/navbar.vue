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

      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar"
        >
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            >
          </div>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
