// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
	],
	devtools: { enabled: true },
	css: ["~/static/css/app.css"],
	compatibilityDate: "2025-07-15",
	vite: {
		plugins: [tailwindcss()],
	},
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
	title: "The Fab(ulous) Dashboard",
});
