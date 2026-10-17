// Builds the archived sites in previous/<slug>/ into dist/previous/<slug>/ with the main project's
// dependencies, and writes an index.html copy for every route so deep links work on a plain
// `try_files $uri $uri/ /index.html` nginx setup.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const vite = join(root, "node_modules", "vite", "bin", "vite.js");

const editions = readdirSync(join(root, "previous"), { withFileTypes: true })
	.filter((d) => d.isDirectory() && existsSync(join(root, "previous", d.name, "vite.config.ts")))
	.map((d) => d.name);

for (const slug of editions) {
	const dir = join(root, "previous", slug);
	console.log(`Building /previous/${slug}/`);
	execFileSync(process.execPath, [vite, "build", "--config", join(dir, "vite.config.ts"), "--logLevel", "warn"], {
		cwd: root,
		stdio: "inherit",
	});

	const out = join(root, "dist", "previous", slug);
	const routeTree = await readFile(join(dir, "src", "routeTree.gen.ts"), "utf8");
	const routes = [...new Set([...routeTree.matchAll(/fullPath: '([^']+)'/g)].map((m) => m[1]))].filter((p) => p !== "/");
	for (const route of routes) {
		const target = join(out, route, "index.html");
		await mkdir(dirname(target), { recursive: true });
		await copyFile(join(out, "index.html"), target);
	}
	console.log(`  ${routes.length} routes`);
}
