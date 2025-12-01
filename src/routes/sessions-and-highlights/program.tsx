import BasePageLayout from "@/components/layout/BasePageLayout";
import { program, type AnyProgramItem } from "@/lib/program";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sessions-and-highlights/program")({
	component: RouteComponent,
});
function makeProgramComponent(item: AnyProgramItem): React.ReactElement | null {
	switch (item.type) {
		case "item":
			return (
				<tr>
					<td className="program-time__cell">{item.time}</td>
					<td>{item.title}</td>
				</tr>
			);
		case "plenary":
			return (
				<>
					<tr>
						<td className="text-center" colSpan={2}>
							<p>{item.title}</p>
							<p>Moderator – {item.moderator}</p>
						</td>
					</tr>
					{item.items.map((i) => makeProgramComponent(i))}
				</>
			);
		case "highlight_lecture":
			return (
				<tr>
					<td className="program-time__cell">
						<p>{item.time}</p>
					</td>
					<td>
						<p>{item.title}</p>
						<p>{item.paperTitle}</p>
						<p>{item.presenter}</p>
					</td>
				</tr>
			);
		case "roundtable_meeting":
			return (
				<tr>
					<td className="program-time__cell">
						<p>{item.time}</p>
					</td>
					<td>
						<p>{item.title}</p>
						<p>{item.topic}</p>
						<div className="flex flex-row gap-2">
							<p>Moderators: </p>
							<ul>
								{item.moderators.map((s) => (
									<li>{s}</li>
								))}
							</ul>
						</div>
					</td>
				</tr>
			);

		case "opening_ceremony":
			return (
				<tr>
					<td className="program-time__cell">{item.time}</td>
					<td>
						<p>{item.title}</p>
						<p>Welcome speeches</p>
						<ul>
							{item.welcome_speeches.map((s) => (
								<li>{s}</li>
							))}
						</ul>
						<p>Concert</p>
					</td>
				</tr>
			);
	}
}
function RouteComponent() {
	return (
		<BasePageLayout name="Technical Program">
			<table className="table border program">
				<tbody>
					{program.map((p) => (
						<>
							<tr>
								<td className="text-center" colSpan={2}>
									{p.time}
								</td>
							</tr>
							{p.items.map((i) => makeProgramComponent(i))}
						</>
					))}
				</tbody>
			</table>
		</BasePageLayout>
	);
}
