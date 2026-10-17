import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@/i18n.ts";

import { routeTree } from "./routeTree.gen";

import "./styles.css";
// import reportWebVitals from "./reportWebVitals.ts";

const router = createRouter({
	routeTree,
	// Served from /previous/scitech-2025/ next to the current site.
	basepath: import.meta.env.BASE_URL.replace(/\/$/, ""),
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

// reportWebVitals()
