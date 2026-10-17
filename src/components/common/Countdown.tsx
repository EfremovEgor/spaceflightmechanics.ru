import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/lang";

/** Forum opening: November 24, 2026, Moscow time. */
export const FORUM_START = new Date("2026-11-24T09:00:00+03:00").getTime();
export const FORUM_END = new Date("2026-11-26T18:00:00+03:00").getTime();

function parts(ms: number) {
	const s = Math.max(0, Math.floor(ms / 1000));
	return [
		{ label: "days", value: Math.floor(s / 86400) },
		{ label: "hrs", value: Math.floor((s % 86400) / 3600) },
		{ label: "min", value: Math.floor((s % 3600) / 60) },
		{ label: "sec", value: s % 60 },
	];
}

function Digit({ value }: { value: string }) {
	return (
		<span className="relative inline-flex h-[1.1em] w-[0.68em] justify-center overflow-hidden">
			<AnimatePresence initial={false} mode="popLayout">
				<motion.span
					key={value}
					initial={{ y: "-100%", opacity: 0 }}
					animate={{ y: "0%", opacity: 1 }}
					exit={{ y: "100%", opacity: 0 }}
					transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
					className="absolute"
				>
					{value}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}

/** Mission-style T-minus countdown to the opening of the Forum. */
export default function Countdown({ className = "" }: { className?: string }) {
	const { t } = useT();
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	if (now !== null && now > FORUM_END) return null;
	const live = now !== null && now >= FORUM_START;
	const p = parts(now === null ? 0 : FORUM_START - now);

	return (
		<div className={`inline-flex items-center gap-4 ${className}`} role="timer" aria-live="off">
			<span className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-flare uppercase">
				<span className="relative flex size-2">
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-flare opacity-60" />
					<span className="relative inline-flex size-2 rounded-full bg-flare" />
				</span>
				{live ? t("common.live") : "T−"}
			</span>
			{!live && (
				<div className="flex items-end gap-3 font-mono sm:gap-4">
					{p.map((x, i) => (
						<div key={x.label} className="flex items-end gap-3 sm:gap-4">
							<div className="flex flex-col items-center">
								<span className="flex text-2xl leading-none font-medium text-white tabular-nums sm:text-3xl">
									{String(x.value)
										.padStart(2, "0")
										.split("")
										.map((d, k) => (
											<Digit key={k} value={now === null ? "–" : d} />
										))}
								</span>
								<span className="mt-1.5 text-[0.6rem] tracking-[0.2em] text-dim uppercase">{t(`common.${x.label}`)}</span>
							</div>
							{i < p.length - 1 && <span className="pb-5 text-xl text-dim">:</span>}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
