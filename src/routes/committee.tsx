import { EASE } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { countryOf } from "@/components/space/geo";
import { setSceneValue, useSceneValue } from "@/components/space/sceneStore";
import { AFFILIATION_RU, committee, NAME_RU, type CommitteeMember } from "@/lib/committee";
import { useT } from "@/lib/lang";
import { pageHead, Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/committee")({
	component: RouteComponent,
	head: () => pageHead(Routes.committee),
});

const ROLES = ["Chair", "Co-Chair", "Member"];

function MemberCard({ m, index }: { m: CommitteeMember; index: number }) {
	const country = countryOf(m.affiliation);
	const focused = useSceneValue((s) => s.focusCountry === country);
	const chair = m.role === "Chair";
	const { t, lang } = useT();
	const ru = lang === "ru";

	const focus = () => setSceneValue("focusCountry", country);
	const blur = () => setSceneValue("focusCountry", null);

	return (
		<motion.li
			layout
			initial={{ opacity: 0, y: 24, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
			transition={{ duration: 0.6, ease: EASE, delay: Math.min(index, 12) * 0.035 }}
			className={chair ? "sm:col-span-2" : ""}
		>
			<button
				type="button"
				onMouseEnter={focus}
				onMouseLeave={blur}
				onFocus={focus}
				onBlur={blur}
				onClick={() => setSceneValue("focusCountry", focused ? null : country)}
				className={`panel group relative flex h-full w-full flex-col gap-3 overflow-hidden p-5 text-left transition-[border-color,box-shadow,transform] duration-300 sm:p-6 ${
					focused
						? "border-flare/50 shadow-[0_0_40px_-12px_rgb(255_138_61_/_0.55)]"
						: "hover:border-line-strong"
				} ${chair ? "sm:p-8" : ""}`}
			>
				<span
					aria-hidden
					className={`pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,rgb(255_138_61/0.12),transparent_60%)] transition-opacity duration-500 ${
						focused ? "opacity-100" : "opacity-0"
					}`}
				/>
				<span className="relative flex items-center justify-between gap-3">
					<span
						className={`chip ${chair ? "border-flare/50 text-flare" : m.role === "Co-Chair" ? "border-accent/40 text-accent" : ""}`}
					>
						{t(`committee.${m.role}`)}
					</span>
					<Icon
						icon="mdi:crosshairs-gps"
						className={`text-lg transition-all duration-500 ${focused ? "rotate-90 text-flare" : "text-dim"}`}
					/>
				</span>
				<span
					className={`relative font-display leading-snug text-white ${chair ? "text-2xl sm:text-3xl" : "text-[1.05rem]"}`}
				>
					{ru ? (NAME_RU[m.fullName] ?? m.fullName) : m.fullName}
				</span>
				<span className="relative text-sm leading-relaxed text-muted">
					{ru ? (AFFILIATION_RU[m.affiliation] ?? m.affiliation) : m.affiliation}
				</span>
			</button>
		</motion.li>
	);
}

function RouteComponent() {
	const [role, setRole] = useState<string | null>(null);
	const { t } = useT();
	const list = role ? committee.filter((m) => m.role === role) : committee;

	return (
		<BasePageLayout name={t("committee.title")}>
			<div className="grid gap-10 lg:grid-cols-12">
				<div className="lg:col-span-7">
					<LayoutGroup>
						<div className="mb-6 flex flex-wrap gap-2" role="tablist">
							{[null, ...ROLES].map((r) => {
								const on = role === r;
								const count = r ? committee.filter((m) => m.role === r).length : committee.length;
								return (
									<button
										key={r ?? "all"}
										type="button"
										role="tab"
										aria-selected={on}
										onClick={() => setRole(r)}
										className={`relative rounded-full px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors ${
											on ? "text-white" : "text-muted hover:text-white"
										}`}
									>
										{on && (
											<motion.span
												layoutId="role-pill"
												className="absolute inset-0 -z-10 rounded-full border border-accent/50 bg-primary/40"
												transition={{ type: "spring", stiffness: 380, damping: 32 }}
											/>
										)}
										{r ? t(`committee.${r}`) : t("committee.all")} <span className="text-dim">{count}</span>
									</button>
								);
							})}
						</div>

						<motion.ul layout className="grid gap-3 sm:grid-cols-2">
							<AnimatePresence mode="popLayout">
								{list.map((m, i) => (
									<MemberCard key={m.fullName + m.affiliation + m.role} m={m} index={i} />
								))}
							</AnimatePresence>
						</motion.ul>
					</LayoutGroup>
				</div>
				{/* The globe sits behind this column; it is a drag area on desktop. */}
				<div data-stage className="sticky top-28 hidden h-[70vh] lg:col-span-5 lg:block" />
			</div>
		</BasePageLayout>
	);
}
