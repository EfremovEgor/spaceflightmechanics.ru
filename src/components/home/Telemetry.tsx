import { formatCoord, VENUE } from "@/components/space/geo";
import { useEffect, useState } from "react";

/** Mission-control style readout: live UTC clock and the venue coordinates. */
export default function Telemetry({ className = "" }: { className?: string }) {
	const [now, setNow] = useState<Date | null>(null);
	useEffect(() => {
		setNow(new Date());
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	const time = now ? now.toISOString().slice(11, 19) : "--:--:--";
	return (
		<div aria-hidden className={`font-mono text-[0.68rem] leading-relaxed tracking-[0.16em] text-dim uppercase ${className}`}>
			<div className="flex items-center justify-end gap-2">
				<span className="size-1.5 animate-pulse rounded-full bg-success" />
				UTC <span className="text-muted tabular-nums">{time}</span>
			</div>
			<div className="text-right text-muted">{formatCoord(VENUE.lat, VENUE.lon)}</div>
		</div>
	);
}
