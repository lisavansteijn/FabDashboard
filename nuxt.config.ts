// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/color-mode"],
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  colorMode: {
    dataValue: "theme",
  },
});
