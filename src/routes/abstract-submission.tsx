import { ButtonAnchor } from "@/components/common/Button";
import DownloadLink from "@/components/common/DownloadLink";
import { Reveal, SpotlightCard } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { pageHead, Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { Trans } from "react-i18next";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/abstract-submission")({
	component: RouteComponent,
	head: () => pageHead(Routes.submission),
});

function RouteComponent() {
	const { t } = useT();
	const b = { b: <strong className="text-white" /> };
	return (
		<BasePageLayout name={t("submission.title")}>
			<div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
				<Reveal className="lg:col-span-7">
					<SpotlightCard className="h-full p-6 sm:p-10" tilt={false}>
						<div className="relative flex flex-col gap-8">
							<span className="flex size-12 items-center justify-center rounded-2xl border border-line-strong bg-primary/30 text-2xl text-cyan">
								<Icon icon="mdi:file-send-outline" />
							</span>
							<p className="text-lg leading-relaxed text-ink sm:text-xl">
								{t("submission.original")}
							</p>
							<div>
								<ButtonAnchor
									href="https://submission.spacescitech.com/call_for_papers/scitech2026/submit?lang=en"
									target="_blank"
								>
									{t("common.submitNow")}
								</ButtonAnchor>
							</div>
						</div>
					</SpotlightCard>
				</Reveal>

				<Reveal className="lg:col-span-5" delay={0.1}>
					<SpotlightCard className="h-full p-6 sm:p-10" tilt={false}>
						<div className="relative flex flex-col gap-6">
							<span className="flex size-12 items-center justify-center rounded-2xl border border-flare/30 bg-flare/10 text-2xl text-flare">
								<Icon icon="mdi:lifebuoy" />
							</span>
							<p className="leading-relaxed text-muted">
								<Trans t={t} i18nKey="submission.help" components={{ mail: <a className="link" href="mailto:orgcom@spacescitech.com" /> }} />
							</p>
						</div>
					</SpotlightCard>
				</Reveal>
			</div>

			<ul className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-3">
				<Reveal as="li" delay={0.05}>
					<SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-8">
						<Icon icon="mdi:translate" className="relative text-3xl text-cyan" />
						<p className="relative leading-relaxed text-muted">
							<Trans t={t} i18nKey="submission.english" components={b} />
						</p>
					</SpotlightCard>
				</Reveal>
				<Reveal as="li" delay={0.12}>
					<SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-8">
						<span className="relative flex items-center gap-3">
							<Icon icon="mdi:presentation" className="text-3xl text-violet" />
							<span className="chip">16 × 9</span>
						</span>
						<p className="relative leading-relaxed text-muted">
							<Trans t={t} i18nKey="submission.pptx" components={b} />
						</p>
					</SpotlightCard>
				</Reveal>
				<Reveal as="li" delay={0.19}>
					<SpotlightCard className="flex h-full flex-col gap-5 p-6 sm:p-8">
						<span className="relative flex items-center gap-3">
							<Icon icon="mdi:file-word-outline" className="text-3xl text-accent" />
							<span className="chip">.docx</span>
						</span>
						<p className="relative leading-relaxed text-muted">
							<Trans
								t={t}
								i18nKey="submission.docx"
								components={{ ...b, template: <DownloadLink path="/files/manuscript_template.docx" /> }}
							/>
						</p>
					</SpotlightCard>
				</Reveal>
			</ul>

			<Reveal className="mt-4 sm:mt-5">
				<SpotlightCard className="p-6 sm:p-10" tilt={false}>
					<div className="relative grid gap-6 leading-relaxed text-muted md:grid-cols-2 md:gap-10">
						<p>{t("submission.reports")}</p>
						<p>{t("submission.speeches")}</p>
					</div>
				</SpotlightCard>
			</Reveal>
		</BasePageLayout>
	);
}
