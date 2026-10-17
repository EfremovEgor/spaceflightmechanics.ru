import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { Reveal, SpotlightCard } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import RegistrationForm from "@/components/RegistrationForm";
import { pageHead, Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Trans } from "react-i18next";
import { useT } from "@/lib/lang";

export const Route = createFileRoute("/registration")({
	component: RouteComponent,
	head: () => pageHead(Routes.registration),
});

function SuccessMark() {
	return (
		<svg viewBox="0 0 52 52" className="size-20 text-success" aria-hidden>
			<motion.circle
				cx="26"
				cy="26"
				r="24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
			/>
			<motion.path
				d="M15 27l7 7 15-16"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
			/>
		</svg>
	);
}

function RouteComponent() {
	const [modalState, setModalState] = useState<null | "submission" | "success">(null);
	const { t } = useT();
	return (
		<BasePageLayout name={t("registration.title")}>
			<Modal name={t("registration.modal")} onClose={() => setModalState(null)} open={modalState == "submission"}>
				<RegistrationForm onSuccess={() => setModalState("success")} />
			</Modal>
			<Modal name="" onClose={() => setModalState(null)} open={modalState == "success"}>
				<div className="flex w-full flex-col items-center justify-center gap-6 py-6 text-center text-xl sm:text-2xl">
					<SuccessMark />
					<p className="max-w-md text-white">
						<Trans t={t} i18nKey="registration.success" />
					</p>
				</div>
			</Modal>

			<div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
				<Reveal className="lg:col-span-7">
					<SpotlightCard className="h-full p-6 sm:p-10" tilt={false}>
						<div className="relative flex flex-col gap-8">
							<span className="flex size-12 items-center justify-center rounded-2xl border border-line-strong bg-primary/30 text-2xl text-cyan">
								<Icon icon="mdi:account-plus-outline" />
							</span>
							<p className="text-lg leading-relaxed text-ink sm:text-xl">
								{t("registration.intro")}
							</p>
							<div>
								<Button onClick={() => setModalState("submission")}>{t("common.registerNow")}</Button>
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
								<Trans t={t} i18nKey="registration.help" components={{ mail: <a className="link" href="mailto:orgcom@spacescitech.com" /> }} />
							</p>
						</div>
					</SpotlightCard>
				</Reveal>
			</div>
		</BasePageLayout>
	);
}
