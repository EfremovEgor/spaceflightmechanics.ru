import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: false,
		}),
		tailwindcss(),
		viteReact(),
	],

	server: {
		// The Django backend (with its virtualenv) and archived sites are separate projects.
		watch: { ignored: ["**/backend/**", "**/previous/**"] },
	},

	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@components": resolve(__dirname, "./src/components"),
		},
	},
});
