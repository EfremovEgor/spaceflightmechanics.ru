import ExternalLink from "@/components/common/ExternalLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
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
				is taking place on December 2-4, 2025 in Moscow, Russia. The
				Forum is organized by{" "}
				<strong>Russian Academy of Sciences</strong> and{" "}
				<strong>RUDN University</strong>.
			</p>
			<p className="paragraph">
				The <strong>Hybrid format (on-site and online)</strong> is
				supposed. We encourage researchers to take part in face-to-face
				activities, but as for the willing of the participants, it is
				possible an online experience as well.{" "}
				<strong>Working languages</strong>: Russian and English
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
				<strong>Abstract Submission Deadline:</strong> October 31, 2025{" "}
				<br />
				<strong>
					Paper and Presentation Submission Deadline:
				</strong>{" "}
				November 15, 2025
			</p>
			<p className="paragraph">
				Papers for the Forum shall be selected basing on the quality of
				500 word abstracts. For accepted papers presentations and
				complete manuscripts are to be submitted. Forum proceedings will
				be published as special volume in{" "}
				<strong>Advances in Mechanics and Control</strong> by RUDN
				University. The best papers will be recommended for publication
				in special issue of{" "}
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
					<li>Space Flight Mechanics</li>
					<li>Space Operations</li>
					<li>Small Satellite Missions</li>
					<li>Earth Observations</li>
					<li>Deep Space Exploration</li>
					<li>Space Materials & Structures</li>
					<li>Space Power & Propulsion</li>
					<li>Space Law & Economics</li>
				</ul>
			</p>
		</BasePageLayout>
	);
}
