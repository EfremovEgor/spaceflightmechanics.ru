import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../../sessions-and-highlights/highlight-lectures";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/sessions-and-highlights/highlight-lectures")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.sessions_and_highlights.routes!.highlight_lectures, "/sessions-and-highlights/highlight-lectures", "ru"),
});
