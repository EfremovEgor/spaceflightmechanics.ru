import Accordion from "@/components/common/Accordion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { RoundtableMeetings } from "@/lib/sessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/sessions-and-highlights/roundtable-meetings"
)({
	component: RouteComponent,
	head: () => ({
		meta: Routes.sessions_and_highlights.routes!.roundtable_meetings.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Roundtable Meetings">
			<div className="mt-4">
				{RoundtableMeetings.map((s) => (
					<>
						<h2 className="font-bold mt-4">{s.name}</h2>
						<div className="mt-4">
							<strong>Moderator:</strong>
							<br />
							{s.moderator.fullName}, {s.moderator.affiliation}
						</div>
						<div className="mt-4 ml-4">
							<Accordion
								items={[
									{
										content: (
											<div className="text-sm grid grid-cols-2 gap-4">
												{s.participants.map((p) => (
													<p>
														{p.fullName}
														<br />
														{p.affiliation}
													</p>
												))}
											</div>
										),
										title: "Participants",
									},
								]}
							/>
						</div>
						{s.description && (
							<div className="mt-4 ml-4">
								<Accordion
									items={[
										{
											content: (
												<div className="text-sm">
													<p className="text-justify">
														{s.description}
													</p>
												</div>
											),
											title: "Description",
										},
									]}
								/>
							</div>
						)}
						<hr className="my-2" />
					</>
				))}
			</div>
		</BasePageLayout>
	);
}
