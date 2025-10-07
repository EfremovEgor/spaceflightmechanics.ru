import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { TechnicalSessions } from "@/lib/sessions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/sessions-and-highlights/technical-sessions"
)({
	component: RouteComponent,
	head: () => ({
		meta: Routes.sessions_and_highlights.routes!.technical_sessions.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Technical Sessions">
			<table className="sessions-table-full hidden md:table">
				<tbody>
					<tr>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[0].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[0].chair}
									<p className="paragraph">
										{TechnicalSessions[0].description}
									</p>
								</div>
							</div>
						</td>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[1].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[1].chair}
									<p className="paragraph">
										{TechnicalSessions[1].description}
									</p>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[2].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[2].chair}
									<p className="paragraph">
										{TechnicalSessions[2].description}
									</p>
								</div>
							</div>
						</td>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[3].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[3].chair}
									<p className="paragraph">
										{TechnicalSessions[3].description}
									</p>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[4].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[4].chair}
									<p className="paragraph">
										{TechnicalSessions[4].description}
									</p>
								</div>
							</div>
						</td>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[5].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[5].chair}
									<p className="paragraph">
										{TechnicalSessions[5].description}
									</p>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[6].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[6].chair}
									<p className="paragraph">
										{TechnicalSessions[6].description}
									</p>
								</div>
							</div>
						</td>
						<td>
							<div>
								<h2 className="font-bold uppercase">
									{TechnicalSessions[7].name}
								</h2>
								<div className="mt-4">
									<strong>Session Chair:</strong> <br />
									{TechnicalSessions[7].chair}
									<p className="paragraph">
										{TechnicalSessions[7].description}
									</p>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<div className="flex flex-col gap-4 md:hidden">
				{TechnicalSessions.map((s) => (
					<>
						<div>
							<h2 className="font-bold uppercase">{s.name}</h2>
							<div className="mt-2">
								<strong>Session Chair:</strong> <br />
								{s.chair}
								<p className="text-justify mt-2">
									{s.description}
								</p>
							</div>
						</div>
						<hr />
					</>
				))}
			</div>
		</BasePageLayout>
	);
}
