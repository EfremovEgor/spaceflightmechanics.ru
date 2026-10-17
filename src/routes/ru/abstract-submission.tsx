import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { Route as EnRoute } from "../abstract-submission";

// Russian version: same page component, Russian head; texts follow the /ru URL.
export const Route = createFileRoute("/ru/abstract-submission")({
	component: EnRoute.options.component,
	head: () => pageHead(Routes.submission, Routes.submission.path, "ru"),
});
