// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxt/ui",
    "nuxt-csurf",
    "nuxt-charts",
  ],
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  debug: true,
  ui: {
    fileUpload: {
      compoundVariants: [
        {
          class: "focus-visible:outline-primary",
        },
        {
          highlight: true,
          class: "border-neutral",
        },
      ],
      defaultVariants: {
        variant: "area",
        size: "md",
      },
    },
  },
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

  fonts: {
    defaults: {
      weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
      styles: ["normal", "italic"],
    },
    families: [
      { name: "Outfit", provider: "bunny", global: true },
      { name: "Work Sans", provider: "bunny", global: true },
    ],
  },
});
