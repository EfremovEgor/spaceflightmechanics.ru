import { Reveal, SpotlightCard } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { formatCoord, VENUE } from "@/components/space/geo";
import { useT } from "@/lib/lang";
import { pageHead, Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
	component: RouteComponent,
	head: () => pageHead(Routes.contact),
});

function CopyButton({ value }: { value: string }) {
	const { t } = useT();
	const [copied, setCopied] = useState(false);
	return (
		<button
			type="button"
			onClick={() => {
				navigator.clipboard?.writeText(value).then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1600);
				});
			}}
			aria-label={t("common.copy", { value })}
			className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-cyan/60 hover:text-white"
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={copied ? "ok" : "copy"}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.5, opacity: 0 }}
					transition={{ duration: 0.18 }}
				>
					<Icon icon={copied ? "mdi:check" : "mdi:content-copy"} className={copied ? "text-success" : ""} />
				</motion.span>
			</AnimatePresence>
		</button>
	);
}

function RouteComponent() {
	const { t } = useT();
	return (
		<BasePageLayout name={t("contact.title")}>
			<div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
				<div className="flex flex-col gap-4 sm:gap-5 lg:col-span-5">
					<Reveal>
						<SpotlightCard className="p-6 sm:p-8" tilt={false}>
							<div className="relative flex items-start gap-4">
								<span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-flare/30 bg-flare/10 text-xl text-flare">
									<Icon icon="mdi:map-marker-radius-outline" />
								</span>
								<p className="leading-relaxed text-muted">
									<strong className="text-white">{t("common.venueAddress")}</strong> <br />
									{t("common.address1")}
									<br /> {t("common.address2")}
									<br /> {t("common.address3")}
								</p>
							</div>
							<p aria-hidden className="relative mt-6 font-mono text-[0.68rem] tracking-[0.16em] text-dim uppercase">
								{formatCoord(VENUE.lat, VENUE.lon)}
							</p>
						</SpotlightCard>
					</Reveal>

					<Reveal delay={0.1}>
						<SpotlightCard className="p-6 sm:p-8" tilt={false}>
							<div className="relative flex items-start gap-4">
								<span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-primary/30 text-xl text-cyan">
									<Icon icon="mdi:satellite-uplink" />
								</span>
								<div className="min-w-0 flex-1 leading-relaxed text-muted">
									<p>
										<strong className="text-white">{t("common.locLabel")}</strong>
									</p>
									<div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
										<p>
											{t("common.phone")}:{" "}
											<a className="link" href="tel:+79197727658">
												+79197727658
											</a>
										</p>
										<CopyButton value="+79197727658" />
									</div>
									<div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
										<p className="min-w-0 break-words">
											{t("common.email")}:{" "}
											<a className="link" href="mailto:orgcom@spacescitech.com">
												orgcom@spacescitech.com
											</a>
										</p>
										<CopyButton value="orgcom@spacescitech.com" />
									</div>
								</div>
							</div>
						</SpotlightCard>
					</Reveal>
				</div>

				<Reveal className="lg:col-span-7" delay={0.15}>
					<div className="panel hud-corners relative h-full min-h-[360px] overflow-hidden p-1.5 sm:min-h-[440px]">
						<iframe
							title={t("common.mapTitle")}
							src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1125.5620053050418!2d37.499574!3d55.652052!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM5JzA3LjciTiAzN8KwMjknNTguOSJF!5e0!3m2!1sen!2sru!4v1759307121673!5m2!1sen!2sru"
							allowFullScreen
							className="h-full min-h-[350px] w-full rounded-[1rem] [filter:invert(0.92)_hue-rotate(185deg)_saturate(0.75)_brightness(0.95)] sm:min-h-[430px]"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</Reveal>
			</div>
		</BasePageLayout>
	);
}
