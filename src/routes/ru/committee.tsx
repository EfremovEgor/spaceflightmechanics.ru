import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../committee";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/committee")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.committee, Routes.committee.path, "ru"),
});
