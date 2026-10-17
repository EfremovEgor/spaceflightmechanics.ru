import { motion } from "motion/react";
import { EASE } from "@/components/common/motion";
import { useT } from "@/lib/lang";

/** Placeholder for sections whose details are not announced yet. */
const ToBeDiscussed = () => {
	const { t, lang } = useT();
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, ease: EASE, delay: 0.3 }}
			className="panel hud-corners relative flex min-h-[320px] max-w-2xl items-center justify-center overflow-hidden sm:min-h-[380px]"
		>
			{/* Orbit rings */}
			<div aria-hidden className="absolute inset-0 flex items-center justify-center">
				<div className="absolute size-[260px] rounded-full border border-line sm:size-[320px]" />
				<div className="absolute size-[190px] animate-spin-slow rounded-full border border-dashed border-accent/30 sm:size-[230px]" />
				<div className="absolute size-[260px] animate-[spin_9s_linear_infinite] sm:size-[320px]">
					<span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_16px_4px_rgb(94_240_255_/_0.6)]" />
				</div>
				<div className="absolute size-[190px] animate-[spin_14s_linear_infinite_reverse] sm:size-[230px]">
					<span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-flare shadow-[0_0_12px_3px_rgb(255_138_61_/_0.6)]" />
				</div>
			</div>
			{/* Scan line */}
			<div aria-hidden className="absolute inset-x-0 top-0 h-full overflow-hidden">
				<div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-cyan/10 to-transparent" />
			</div>
			<p className="relative">
				<span
					className={`text-gradient animate-shimmer font-display font-semibold tracking-tight ${
						lang === "ru" ? "text-4xl sm:text-6xl" : "text-7xl sm:text-8xl"
					}`}
				>
					{t("common.tbd")}
				</span>
			</p>
			<span aria-hidden className="absolute bottom-5 left-6 font-mono text-[0.65rem] tracking-[0.2em] text-dim uppercase">
				<span className="animate-blink">▍</span>
			</span>
		</motion.div>
	);
};

export default ToBeDiscussed;
