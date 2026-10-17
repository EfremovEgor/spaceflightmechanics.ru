// Archived site of the 6th SciTech Forum (2025), served at /previous/scitech-2025/.
// Built with the main project's node_modules: `node scripts/build-previous.mjs` from the repository root.
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const repo = resolve(root, "../..");
const slug = "scitech-2025";

export default defineConfig({
	root,
	base: `/previous/${slug}/`,
	// VITE_API_URL comes from the main site's .env.
	envDir: repo,
	publicDir: resolve(root, "public"),
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: false,
			routesDirectory: resolve(root, "src/routes"),
			generatedRouteTree: resolve(root, "src/routeTree.gen.ts"),
		}),
		tailwindcss(),
		viteReact(),
	],
	resolve: {
		alias: {
			"@": resolve(root, "src"),
			"@components": resolve(root, "src/components"),
		},
	},
	build: {
		outDir: resolve(repo, "dist/previous", slug),
		emptyOutDir: true,
	},
});
