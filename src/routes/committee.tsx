import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
const committee: {
	fullName: string;
	affiliation: string;
	role: string;
}[] = [
	{
		fullName: "Yury Razoumny",
		affiliation: "RUDN University, Russia",
		role: "Chair",
	},
	{
		fullName: "Meena Laad",
		affiliation: "Symbiosis Institute of Technology, India",
		role: "Co-Chair",
	},
	{
		fullName: "Antonio Prado",
		affiliation: "National Institute for Space Research, Brazil",
		role: "Co-Chair",
	},
	{
		fullName: "Shufan Wu",
		affiliation: "Shanghai Jiao Tong University, China",
		role: "Co-Chair",
	},
	{
		fullName: "Renuganth Varatharajoo",
		affiliation: "Universiti Putra Malaysia, Malaysia",
		role: "Co-Chair",
	},
	{
		fullName: "Elena Fantino",
		affiliation: "Khalifa University of Science and Technology, UAE",
		role: "Co-Chair",
	},
	{
		fullName: "Brij Agrawal",
		affiliation: "Naval Postgraduate School Monterey, USA",
		role: "Member",
	},
	{
		fullName: "Valery Bondur",
		affiliation: "Russian Academy of Sciences, Russia",
		role: "Member",
	},
	{
		fullName: "Christophe Bonnal",
		affiliation: "CNES, France",
		role: "Member",
	},
	{
		fullName: "Fabio Celani",
		affiliation: "Sapienza University of Rome, Italy",
		role: "Member",
	},
	{
		fullName: "Rock Jeng-hing ChernS",
		affiliation: "Ryerson University, Canada",
		role: "Member",
	},
	{
		fullName: "Sergey Chernyshev",
		affiliation: "Russian Academy of Sciences, Russia",
		role: "Member",
	},
	{
		fullName: "Pini Gurfil",
		affiliation: "Technion - Israel Institute of Technology, Israel",
		role: "Member",
	},
	{
		fullName: "Djojodihardjo Harijono",
		affiliation: "University Putra, Malaysia",
		role: "Member",
	},
	{
		fullName: "Ketan Kotecha",
		affiliation: "Symbiosis Institute of Technology, India",
		role: "Member",
	},
	{
		fullName: "Bok Jik Lee",
		affiliation: "Seoul National University, Korea",
		role: "Member",
	},
	{
		fullName: "Robert Melton",
		affiliation: "Penn State University, USA",
		role: "Member",
	},
	{
		fullName: "Arun Misra",
		affiliation: "McGill University, Canada",
		role: "Member",
	},
	{
		fullName: "Daniele Mortari",
		affiliation: "University of Arizona, USA",
		role: "Member",
	},
	{
		fullName: "Peter Jan Pahl",
		affiliation: "Freie Universitaet Berlin, Germany",
		role: "Member",
	},
	{
		fullName: "Giovanni Palmerini",
		affiliation: "Sapienza University of Rome, Italy",
		role: "Member",
	},
	{
		fullName: "Vyacheslav Petukhov",
		affiliation: "Moscow Aviation Institute, Russia",
		role: "Member",
	},
	{
		fullName: "Antonio Prado",
		affiliation: "National Institute for Space Research, Brasil",
		role: "Member",
	},
	{
		fullName: "Sergey Reshmin",
		affiliation: "Russian Academy of Sciences, Russia",
		role: "Member",
	},
	{
		fullName: "Daniel Scheeres",
		affiliation: "University of Colorado Boulder, USA",
		role: "Member",
	},
	{
		fullName: "Tarun Singh",
		affiliation: "Symbiosis Institute of Geo-Informatics, India",
		role: "Member",
	},
	{
		fullName: "David B. Spencer",
		affiliation: "Penn State University, USA",
		role: "Member",
	},
	{
		fullName: "Paolo Teofilatto",
		affiliation: "Sapienza University of Rome, Italy",
		role: "Member",
	},
	{
		fullName: "Tetsuo Yasaka",
		affiliation: "Kyushu University, Japan",
		role: "Member",
	},
	{
		fullName: "Wang Zhaokui",
		affiliation: "Tsinghua University, China",
		role: "Member",
	},
];

export const Route = createFileRoute("/committee")({
	component: RouteComponent,
	head: () => ({
		meta: Routes.committee.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name={"International Program Committee"}>
			<p className="paragraph flex flex-col">
				{committee.map((m) => (
					<span>
						<strong>{m.fullName}</strong>, {m.affiliation}, {m.role}
					</span>
				))}
			</p>
		</BasePageLayout>
	);
}
