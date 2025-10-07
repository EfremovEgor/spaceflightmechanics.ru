import ExternalLink from "@/components/common/ExternalLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/abstract-submission")({
	component: RouteComponent,
	head: () => ({
		meta: Routes.submission.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Submission Guidelines">
			<p className="paragraph">
				All papers must be original and not simultaneously submitted to
				another journal or conference. Authors are responsible to obtain
				prior to submission any required government or company
				clearances of their papers.
			</p>
			<p className="paragraph">
				Papers are selected basing on the quality of 500 word abstracts.
				For accepted papers presentations and complete manuscripts are
				to be submitted.
			</p>
			<p className="paragraph">
				<strong>Abstracts</strong> are submitted in English language via{" "}
				<ExternalLink
					to="https://confchair.org/call_for_papers/issf2025/submit?lang=en"
					text="web-based submission system"
				/>{" "}
				not later than October 31, 2025.
			</p>
			<p className="paragraph">
				<strong>Manuscripts</strong> could be submitted in English, or
				Russian. Manuscripts are to be prepared using the template here:
				in English, or Russian.
			</p>
			<p className="paragraph">
				<strong>Presentations</strong> are to be submitted in English,
				though the report could be done in English or Russian.
				Presentations are to be prepared in .pptx format (16x9 aspect
				ratio).
			</p>
			<p className="paragraph">
				If you require assistance during the submission process, please
				contact us via{" "}
				<a className="link" href="mailto:orgcom@spacescitech.com.">
					orgcom@spacescitech.com
				</a>
				.
			</p>
		</BasePageLayout>
	);
}
