import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "@/i18n.ts";

import { routeTree } from "./routeTree.gen";

import "./styles.css";
// import reportWebVitals from "./reportWebVitals.ts";

const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	// Pages are prerendered as directories (/committee/index.html), so URLs end with a slash.
	trailingSlash: "always",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement) {
	// Prerendered head tags are replaced by the ones the router renders.
	document.querySelectorAll("[data-ssr-head]").forEach((n) => n.remove());
	// The prerendered markup is for crawlers and first paint; React re-renders the page from scratch.
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}

// reportWebVitals()
