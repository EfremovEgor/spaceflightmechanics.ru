import type { ReactNode } from "react";

/** Endless horizontal ticker; pauses on hover. */
export default function Marquee({ items, className = "" }: { items: ReactNode[]; className?: string }) {
	const row = (hidden: boolean) => (
		<div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
			{items.map((it, i) => (
				<span key={i} className="flex items-center">
					<span className="px-6 sm:px-10">{it}</span>
					<span className="text-accent/70">✦</span>
				</span>
			))}
		</div>
	);
	return (
		<div
			className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}
		>
			<div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
				{row(false)}
				{row(true)}
			</div>
		</div>
	);
}
