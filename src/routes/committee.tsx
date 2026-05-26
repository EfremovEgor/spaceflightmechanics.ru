import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
const committee: {
  fullName: string;
  affiliation: string;
  role: string;
}[] = [
  {
    fullName: "Yury N. Razoumny",
    affiliation: "RUDN University, Russia",
    role: "Chair",
  },
  {
    fullName: "Ketan Kotecha",
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
    fullName: "Francis Chizea",
    affiliation: "National Space Research and Development Agency, Nigeria",
    role: "Co-Chair",
  },
  {
    fullName: "Yeshurun Alemayehu",
    affiliation: "Ministry of Innovation and Technology, Ethiopia",
    role: "Co-Chair",
  },
  {
    fullName: "Christophe Bonnal",
    affiliation: "CNES, France",
    role: "Member",
  },
  {
    fullName: "Filippo Graziani",
    affiliation: "University of Pisa, Italy",
    role: "Member",
  },
  {
    fullName: "Rock Jeng-Shing Chern",
    affiliation: "Ryerson University, Canada",
    role: "Member",
  },
  {
    fullName: "Pini Gurfil",
    affiliation: "Technion, Israel Institute of Technology, Israel",
    role: "Member",
  },
  {
    fullName: "Djojodihardjo Harijono",
    affiliation: "University Putra, Malaysia",
    role: "Member",
  },
  {
    fullName: "Meena Laad",
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
    fullName: "Giancarlo Genta",
    affiliation: "Polytechnic University of Turin, Italy",
    role: "Member",
  },
  {
    fullName: "Maria Antonietta Perino",
    affiliation: "Polytechnic University of Turin, Italy",
    role: "Member",
  },
  {
    fullName: "Sergei Chernyshev",
    affiliation: "Russian Academy of Sciences, Russia",
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
      <p className="flex flex-col">
        {committee.map((m) => (
          <span key={m.fullName + m.affiliation + m.role}>
            <strong>{m.fullName}</strong>, {m.affiliation}, {m.role}
          </span>
        ))}
      </p>
    </BasePageLayout>
  );
}
