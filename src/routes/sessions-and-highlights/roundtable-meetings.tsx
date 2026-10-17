import BasePageLayout from "@/components/layout/BasePageLayout";
import ToBeDiscussed from "@/components/layout/ToBeDiscussed";
import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/lang";

export const Route = createFileRoute(
  "/sessions-and-highlights/roundtable-meetings",
)({
  component: RouteComponent,
  head: () =>
    pageHead(
      Routes.sessions_and_highlights.routes!.roundtable_meetings,
      `${Routes.sessions_and_highlights.path}/${Routes.sessions_and_highlights.routes!.roundtable_meetings.path}`,
    ),
});

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.roundtable")} section={t("sessions.section")}>
      {/* <div className="mt-4">
				{RoundtableMeetings.map((s) => (
					<>
						<h2 className="font-bold mt-4 uppercase">{s.name}</h2>
						<div className="mt-4">
							<strong>
								Moderator{s.moderators.length > 1 ? "s" : ""}:
							</strong>
							<br />
							{s.moderators.map((m) => (
								<p>
									{m.fullName}, {m.affiliation}
								</p>
							))}
						</div>
						<div className="mt-4 ml-4">
							<Accordion
								items={[
									{
										content: (
											<div className="text-sm grid grid-cols-2 gap-4">
												{s.participants.map((p) => {
													const shouldBreakSeparately =
														p.affiliation.length <
														70;
													return (
														<p>
															<span className="font-bold">
																{p.fullName}
															</span>
															<br />
															{shouldBreakSeparately ? (
																<>
																	{
																		p.affiliation
																	}
																	{","}
																	<br />
																	{p.country}
																</>
															) : (
																<>
																	{
																		p.affiliation
																	}
																	{", "}
																	{p.country}
																</>
															)}
														</p>
													);
												})}
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
			</div> */}
      <ToBeDiscussed />
    </BasePageLayout>
  );
}
