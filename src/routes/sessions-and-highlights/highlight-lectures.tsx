// import Accordion from "@/components/common/Accordion";
import Accordion from "@/components/common/Accordion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { HighlightLectures } from "@/lib/sessions";
// import { HighlightLectures } from "@/lib/sessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/sessions-and-highlights/highlight-lectures"
)({
	component: RouteComponent,
	head: () => ({
		meta: Routes.sessions_and_highlights.routes!.highlight_lectures.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Highlight Lectures">
			<div className="mt-4">
				{HighlightLectures.map((l) => (
					<div>
						<h2 className="font-bold mt-4 uppercase">{l.name}</h2>
						<div className="mt-4">
							<strong>Speaker:</strong>
							<br />
							{l.speaker}
						</div>
						{(l.abstract || l.bio) && (
							<div className="mt-4 ml-4">
								<Accordion
									items={[
										{
											content: (
												<div className="text-sm">
													<p className="text-justify">
														<strong>
															Abstract
														</strong>
														<br />
														{l.abstract}
													</p>

													<p className="text-justify mt-4">
														<strong>
															Short Bio
														</strong>
														<br />
														{l.bio}
													</p>
												</div>
											),
											title: "Description",
										},
									]}
								/>
							</div>
						)}
						<hr className="my-6" />
					</div>
				))}
			</div>
		</BasePageLayout>
	);
}
