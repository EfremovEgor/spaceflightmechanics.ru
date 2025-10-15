import ExternalLink from "@/components/common/ExternalLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { TechnicalSessions } from "@/lib/sessions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: Routes.home.meta,
	}),
});

function App() {
	const { t } = useTranslation();

	return (
		<BasePageLayout name={t("home.About")}>
			<p className="paragraph">
				<strong>
					6<sup>th</sup> SciTech Forum on Space Engineering and
					Operations Support
				</strong>{" "}
				is taking place on December 2-4, 2025 in Moscow, Russian
				Federation. The Forum is organized by{" "}
				<strong>Russian Academy of Sciences</strong> and{" "}
				<strong>RUDN University</strong>.
				<br />
				Phone: +79336677352, email:{" "}
				<a
					className="hover:underline"
					href="mailto:orgcom@spacescitech.com."
				>
					orgcom@spacescitech.com
				</a>{" "}
				(Local Organizing Committee).
			</p>

			<p className="paragraph">
				<strong>Partner in African region</strong>:{" "}
				<strong>Skylinks International Holdings Ltd</strong>, Nairobi,
				Kenya. <br /> Phone: +254717410544, +254721406821, email:{" "}
				<a
					className="hover:underline"
					href="mailto:catherine@skylinksinternational.co.ke"
				>
					catherine@skylinksinternational.co.ke
				</a>
				.
			</p>
			<p className="paragraph">
				The participation in the Forum is free. The{" "}
				<strong>Hybrid format (on-site and online)</strong> is supposed.
				The online format is supposed only for participants outside
				Moscow region. Participants can attend the Forum on-site and
				online with or without presentation. To participate with
				presentation it is necessary to go through the{" "}
				<Link className="link" to="/abstract-submission">
					Submission
				</Link>{" "}
				and{" "}
				<Link className="link" to="/registration">
					Registration
				</Link>{" "}
				processes. Participation without presentation requires only
				registration.
			</p>

			<p className="paragraph">
				<strong>Working languages</strong>: English and Russian
				(simultaneous translation).
			</p>

			<p className="paragraph">
				<strong>Venue:</strong>{" "}
				<ExternalLink
					text="RUDN University"
					to="https://eng.rudn.ru/"
				/>
				, 6 Miklukho-Maklaya Str., Moscow, 117198, Russia
				<br />
				<strong>Abstract Submission Deadline:</strong> November 15, 2025{" "}
				<br />
				<strong>Presentation Submission deadline:</strong> November 20,
				2025 <br />
				<strong>Manuscript Submission deadline:</strong> January 20,
				2026
			</p>
			<p className="paragraph">
				Papers for the Forum shall be selected basing on the quality of
				500 word abstracts. For accepted papers presentations and
				complete manuscripts are to be submitted in accordance with the
				deadlines.
			</p>
			<p className="paragraph">
				Manuscripts will be published in the special volume in Advances
				in Mechanics and Control. The best papers will be recommended
				for publication in special issue of{" "}
				<ExternalLink
					text=" Acta Astronautica"
					to="https://www.sciencedirect.com/journal/acta-astronautica"
				/>
				.
			</p>
			<p className="paragraph">
				<strong>
					The following topics are supposed for presentations:
				</strong>

				<ul className="list-disc list-inside ml-4">
					{TechnicalSessions.map((s) => (
						<li>{s.name}</li>
					))}
				</ul>
			</p>
			<p className="paragraph">
				The on-site participants of the Forum with presentations or
				highlight lectures are provided with full support of Local
				Organizing Committee, including: lunch during the dates of the
				Forum, accommodation support, professional and cultural tours
				(by invitation only). All the participants are welcomed by
				coffebreaks and our warm reception.
			</p>
		</BasePageLayout>
	);
}
