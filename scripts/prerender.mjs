// Writes a static HTML file per page and language after `vite build`, so search engines and
// link previews (Telegram, VK, WhatsApp, Facebook, X) see the content and meta tags without
// running JavaScript. Pages are written as <path>/index.html; the app re-renders on load.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");
const SITE = "https://spacescitech.com";

// Pages shown in navigation; the hidden plenary page is left out of the sitemap.
const PAGES = [
	"/",
	"/committee/",
	"/sessions-and-highlights/program/",
	"/sessions-and-highlights/highlight-lectures/",
	"/sessions-and-highlights/roundtable-meetings/",
	"/sessions-and-highlights/technical-sessions/",
	"/abstract-submission/",
	"/registration/",
	"/contact/",
];
const LANGS = ["en", "ru"];
const localize = (page, lang) => (lang === "en" ? page : page === "/" ? "/ru/" : `/ru${page}`);

const template = await readFile(join(dist, "index.html"), "utf8");
if (!template.includes("<!--ssr-head-->") || !template.includes("<!--ssr-outlet-->")) {
	throw new Error("dist/index.html has no <!--ssr-head--> / <!--ssr-outlet--> markers");
}
const { render } = await import(pathToFileURL(join(ssrDir, "entry-server.js")).href);

// Tags written here are replaced by the live app; main.tsx removes [data-ssr-head] on start.
const markHead = (html) =>
	html.replace(/<(title|meta|link)\b/g, "<$1 data-ssr-head").replaceAll("hrefLang=", "hreflang=");

function page(html, { head, app, url, lang, extraHead = "" }) {
	let out = html
		.replace(
			"<!--ssr-head-->",
			`${markHead(head)}${extraHead}<script data-ssr-head>window.__SSR_PATH__=${JSON.stringify(url)}</script>`,
		)
		.replace("<!--ssr-outlet-->", app);
	if (lang === "ru") {
		out = out
			.replace('<html lang="en">', '<html lang="ru">')
			.replace('<div class="boot-title">7<sup>th</sup> SciTech Forum</div>', '<div class="boot-title">7-й форум SciTech</div>');
	}
	return out;
}

let count = 0;
for (const lang of LANGS) {
	for (const p of PAGES) {
		const url = localize(p, lang);
		const { appHtml, headHtml } = await render(url);
		if (!headHtml.includes('rel="canonical"')) throw new Error(`No canonical link rendered for ${url}`);
		const file = url === "/" ? join(dist, "index.html") : join(dist, url, "index.html");
		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, page(template, { head: headHtml, app: appHtml, url, lang }));
		count++;
	}
}

// 404 page for servers configured with `error_page 404 /404.html`.
{
	const { appHtml, headHtml } = await render("/__not-found__/");
	await writeFile(
		join(dist, "404.html"),
		page(template, {
			head: headHtml,
			app: appHtml,
			url: "/__not-found__/",
			lang: "en",
			extraHead: '<meta data-ssr-head name="robots" content="noindex">',
		}),
	);
}

// Sitemap with hreflang alternates for both languages.
const today = new Date().toISOString().slice(0, 10);
const urls = LANGS.flatMap((lang) =>
	PAGES.map((p) => {
		const alts = LANGS.map(
			(l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${localize(p, l)}"/>`,
		).join("\n");
		return `  <url>
    <loc>${SITE}${localize(p, lang)}</loc>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p}"/>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
	}),
).join("\n");
await writeFile(
	join(dist, "sitemap.xml"),
	`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${count} pages, 404.html and sitemap.xml`);
