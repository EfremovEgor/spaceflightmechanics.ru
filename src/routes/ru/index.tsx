import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../index";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.home, Routes.home.path, "ru"),
});
