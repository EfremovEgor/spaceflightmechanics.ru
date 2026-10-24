import { EASE } from "@/components/common/motion";
import { motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { useT } from "@/lib/lang";

interface Milestone {
	label: string;
	date: string;
	at: number;
	highlight?: boolean;
}

const DAY = 86400000;
const t = (iso: string) => new Date(iso + "T23:59:59+03:00").getTime();

/** Keys into the translation dictionary; `forum.*` keys render with <Trans>. */
const MILESTONES: Milestone[] = [
	{ label: "deadlines.abstract", date: "deadlines.abstractDate", at: t("2026-11-08") },
	{ label: "deadlines.presentation", date: "deadlines.presentationDate", at: t("2026-11-22") },
	{ label: "forum.short", date: "forum.dates", at: t("2026-11-26"), highlight: true },
	{ label: "deadlines.manuscript", date: "deadlines.manuscriptDate", at: t("2027-01-31") },
];

/** Position of "now" on an evenly spaced track, interpolated between milestones. */
function progressAt(now: number) {
	const n = MILESTONES.length;
	const slot = (i: number) => (i + 0.5) / n;
	const first = MILESTONES[0].at;
	const last = MILESTONES[n - 1].at;
	if (now <= first) return Math.max(0, slot(0) * (1 - (first - now) / (60 * DAY)));
	if (now >= last) return Math.min(1, slot(n - 1) + (0.5 / n) * ((now - last) / (30 * DAY)));
	for (let i = 0; i < n - 1; i++) {
		const a = MILESTONES[i].at;
		const b = MILESTONES[i + 1].at;
		if (now <= b) return slot(i) + (slot(i + 1) - slot(i)) * ((now - a) / (b - a));
	}
	return 1;
}

function daysLeft(now: number, at: number) {
	return Math.ceil((at - now) / DAY);
}

export default function Timeline() {
	const { t: tr } = useT();
	const [now, setNow] = useState<number | null>(null);
	useEffect(() => setNow(Date.now()), []);
	const p = now === null ? 0 : progressAt(now);

	return (
		<div className="panel hud-corners relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(140_170_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(140_170_255/0.06)_1px,transparent_1px)] [background-size:40px_40px]"
			/>

			{/* Desktop: horizontal trajectory */}
			<div className="relative hidden md:block">
				<div className="relative mx-[12.5%] h-px bg-line-strong">
					<motion.div
						className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-cyan via-accent to-flare"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
						style={{ width: `${Math.max(0, ((p - 0.125) / 0.75) * 100)}%` }}
					/>
				</div>
				<motion.div
					className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
					initial={{ left: "12.5%", opacity: 0 }}
					whileInView={{ left: `${p * 100}%`, opacity: now === null ? 0 : 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
				>
					<span className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/50" />
					<span className="relative block size-3 rounded-full bg-cyan shadow-[0_0_18px_4px_rgb(94_240_255_/_0.6)]" />
				</motion.div>

				<ol className="relative -mt-[7px] grid grid-cols-4">
					{MILESTONES.map((m, i) => {
						const past = now !== null && now > m.at;
						const d = now === null ? null : daysLeft(now, m.at);
						return (
							<motion.li
								key={m.label}
								className="flex flex-col items-center text-center"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.12 }}
							>
								<span
									className={`block size-3.5 rounded-full border-2 ${
										past
											? "border-dim bg-space-800"
											: m.highlight
												? "border-flare bg-flare shadow-[0_0_20px_4px_rgb(255_138_61_/_0.5)]"
												: "border-accent bg-space-950"
									}`}
								/>
								<span className={`mt-6 text-sm font-bold ${past ? "text-dim" : "text-white"}`}><Trans t={tr} i18nKey={m.label} /></span>
								<span className={`mt-1 ${m.highlight ? "text-flare" : "text-muted"}`}>{tr(m.date)}</span>
								{d !== null && (
									<span className="chip mt-4">{past ? "✓" : tr("common.daysLeft", { count: d })}</span>
								)}
							</motion.li>
						);
					})}
				</ol>
			</div>

			{/* Mobile: vertical trajectory */}
			<ol className="relative ml-2 border-l border-line-strong md:hidden">
				{MILESTONES.map((m, i) => {
					const past = now !== null && now > m.at;
					const d = now === null ? null : daysLeft(now, m.at);
					return (
						<Fragment key={m.label}>
							<motion.li
								className="relative pb-8 pl-7 last:pb-0"
								initial={{ opacity: 0, x: -16 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
							>
								<span
									className={`absolute top-1 -left-[7.5px] block size-3.5 rounded-full border-2 ${
										past
											? "border-dim bg-space-800"
											: m.highlight
												? "border-flare bg-flare shadow-[0_0_16px_3px_rgb(255_138_61_/_0.5)]"
												: "border-accent bg-space-950"
									}`}
								/>
								<p className={`font-bold ${past ? "text-dim" : "text-white"}`}><Trans t={tr} i18nKey={m.label} /></p>
								<p className={m.highlight ? "text-flare" : "text-muted"}>{tr(m.date)}</p>
								{d !== null && <span className="chip mt-2">{past ? "✓" : tr("common.daysLeft", { count: d })}</span>}
							</motion.li>
						</Fragment>
					);
				})}
			</ol>
		</div>
	);
}
