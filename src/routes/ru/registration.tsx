import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../registration";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/registration")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.registration, Routes.registration.path, "ru"),
});
