import { pageHead } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute, plenaryRoute } from "../../sessions-and-highlights/plenary-sessions";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/sessions-and-highlights/plenary-sessions")({
	component: EnRoute.options.component,
	head: () => pageHead(plenaryRoute, plenaryRoute.path, "ru"),
});
