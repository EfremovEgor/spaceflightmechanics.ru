import DownloadLink from "@/components/common/DownloadLink";
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
				<strong>Abstracts</strong> are submitted in English language via{" "}
				<ExternalLink
					to="https://confchair.org/call_for_papers/issf2025/submit?lang=en"
					text="web-based submission system"
				/>
				.
			</p>

			<p className="paragraph">
				<strong>Presentations</strong> are prepared in English language
				only and submitted in .pptx format (16x9 aspect ratio). The
				reports are made in English (Russian language is possible for
				certain reports after coordination with Local Organizing
				Committee).
			</p>
			<p className="paragraph">
				<strong>Manuscripts</strong> could be prepared in English or
				Russian languages, using the following{" "}
				<DownloadLink
					path="/files/manuscript_template.docx"
					text="Manuscript template"
				/>
				, and submitted in .docx format.
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
