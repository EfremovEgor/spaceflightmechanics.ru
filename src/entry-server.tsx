import { renderToString } from "react-dom/server";
import {
	createMemoryHistory,
	createRouter,
	HeadContent,
	RouterContextProvider,
	RouterProvider,
} from "@tanstack/react-router";
import "@/i18n.ts";
import { routeTree } from "./routeTree.gen";

/**
 * Build-time render of one URL for scripts/prerender.mjs: the page markup and its
 * head tags (title, description, canonical, hreflang, Open Graph, Twitter).
 */
export async function render(url: string) {
	const router = createRouter({
		routeTree,
		context: {},
		history: createMemoryHistory({ initialEntries: [url] }),
		trailingSlash: "always",
	});
	await router.load();
	const appHtml = renderToString(<RouterProvider router={router} />);
	const headHtml = renderToString(
		<RouterContextProvider router={router}>
			<HeadContent />
		</RouterContextProvider>,
	);
	return { appHtml, headHtml };
}
