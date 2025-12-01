import BasePageLayout from "@/components/layout/BasePageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sessions-and-highlights/program")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BasePageLayout name="Technical Program">Program</BasePageLayout>;
}
