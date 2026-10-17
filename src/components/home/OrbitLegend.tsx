import { ORBITS } from "@/components/space/orbits";
import { setSceneValue, useSceneValue } from "@/components/space/sceneStore";
import { useT } from "@/lib/lang";

/** Orbit list next to the globe; hovering an entry highlights it in 3D and vice versa. */
export default function OrbitLegend({ className = "" }: { className?: string }) {
	const active = useSceneValue((s) => s.highlightOrbit ?? s.hoverOrbit);
	const ready = useSceneValue((s) => s.ready);
	const { t } = useT();

	return (
		<ul
			className={`flex flex-col gap-0.5 font-mono text-[0.7rem] transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
			onMouseLeave={() => setSceneValue("highlightOrbit", null)}
		>
			{ORBITS.map((o) => {
				const on = active === o.id;
				return (
					<li key={o.id}>
						<button
							type="button"
							onMouseEnter={() => setSceneValue("highlightOrbit", o.id)}
							onFocus={() => setSceneValue("highlightOrbit", o.id)}
							onBlur={() => setSceneValue("highlightOrbit", null)}
							onClick={() => setSceneValue("highlightOrbit", on ? null : o.id)}
							className={`group flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition-colors ${
								on ? "bg-white/[0.06] text-white" : "text-muted hover:text-white"
							}`}
						>
							<span
								className="h-px w-6 transition-all duration-300 group-hover:w-9"
								style={{ background: o.color, boxShadow: on ? `0 0 10px ${o.color}` : undefined, width: on ? 36 : undefined }}
							/>
							<span className="tracking-[0.14em] uppercase">{t(`orbits.${o.id}.name`)}</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
