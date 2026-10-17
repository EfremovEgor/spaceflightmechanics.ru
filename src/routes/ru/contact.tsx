import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../contact";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/contact")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.contact, Routes.contact.path, "ru"),
});
