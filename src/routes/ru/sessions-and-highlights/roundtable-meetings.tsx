import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../../sessions-and-highlights/roundtable-meetings";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/sessions-and-highlights/roundtable-meetings")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.sessions_and_highlights.routes!.roundtable_meetings, "/sessions-and-highlights/roundtable-meetings", "ru"),
});
