import { useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { langFromPath, useT } from "@/lib/lang";
import { PRESETS, presetForPath, scene, setSceneValue, useSceneValue } from "./sceneStore";

const SpaceScene = lazy(() => import("./SpaceScene"));

function hasWebGL() {
	try {
		const c = document.createElement("canvas");
		return !!(c.getContext("webgl2") || c.getContext("webgl"));
	} catch {
		return false;
	}
}

const isStage = (t: EventTarget | null) =>
	t instanceof Element && (t.hasAttribute("data-stage") || t.hasAttribute("data-stage-pass"));

/**
 * Fixed full-screen space scene behind every page. The WebGL part loads lazily
 * after mount; until then (and without WebGL) a CSS gradient stands in.
 */
export default function SpaceBackground() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");
	const [lowPower, setLowPower] = useState(false);
	const ready = useSceneValue((s) => s.ready);
	const veil = useRef<HTMLDivElement>(null);

	const updateVeil = () => {
		if (!veil.current) return;
		const base = PRESETS[scene.preset].veil;
		const k = scene.preset === "home" ? Math.min(1, scene.scrollY / scene.viewportH) * 0.42 : 0;
		veil.current.style.opacity = String(Math.min(0.75, base + k));
	};

	useEffect(() => {
		scene.preset = presetForPath(pathname);
		scene.lang = langFromPath(pathname);
		setSceneValue("focusCountry", null);
		setSceneValue("highlightOrbit", null);
		updateVeil();
	}, [pathname]);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		scene.reducedMotion = reduced.matches;
		const coarse = window.matchMedia("(pointer: coarse)").matches;
		setLowPower(coarse || (navigator.hardwareConcurrency ?? 8) <= 4);
		setMode(hasWebGL() ? "webgl" : "static");

		const onScroll = () => {
			scene.scrollY = window.scrollY;
			updateVeil();
		};
		const onResize = () => {
			scene.viewportH = window.innerHeight;
			onScroll();
		};
		const html = document.documentElement;
		let lastX = 0;
		let lastY = 0;
		const onMove = (e: PointerEvent) => {
			scene.pointer.clientX = e.clientX;
			scene.pointer.clientY = e.clientY;
			scene.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
			scene.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
			if (scene.drag.active) {
				scene.drag.dx += e.clientX - lastX;
				scene.drag.dy += e.pointerType === "mouse" ? e.clientY - lastY : 0;
				lastX = e.clientX;
				lastY = e.clientY;
			} else {
				scene.pointer.overStage = e.pointerType === "mouse" && isStage(e.target);
			}
		};
		const onDown = (e: PointerEvent) => {
			if (e.button !== 0 || !isStage(e.target)) return;
			scene.drag.active = true;
			lastX = e.clientX;
			lastY = e.clientY;
			if (e.pointerType === "mouse") html.classList.add("is-dragging");
		};
		const onUp = () => {
			scene.drag.active = false;
			html.classList.remove("is-dragging");
		};
		const onLeave = (e: MouseEvent) => {
			if (!e.relatedTarget) scene.pointer.overStage = false;
		};

		onResize();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerdown", onDown);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onUp);
		document.addEventListener("mouseout", onLeave);
		const onReduced = () => (scene.reducedMotion = reduced.matches);
		reduced.addEventListener("change", onReduced);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
			document.removeEventListener("mouseout", onLeave);
			reduced.removeEventListener("change", onReduced);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-space-950">
			{/* Static stand-in: shown before WebGL is ready and when it is unavailable. */}
			<div
				className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
				style={{
					background:
						"radial-gradient(60% 55% at 72% 48%, rgb(20 60 140 / 0.35), transparent 70%), radial-gradient(40% 40% at 15% 80%, rgb(90 40 160 / 0.18), transparent 70%), #02040b",
				}}
			/>
			{mode === "webgl" && (
				<div className={`absolute inset-0 transition-opacity duration-[1600ms] ${ready ? "opacity-100" : "opacity-0"}`}>
					<Suspense fallback={null}>
						<SpaceScene lowPower={lowPower} />
					</Suspense>
				</div>
			)}
			<div
				ref={veil}
				className="absolute inset-0 bg-space-950 transition-opacity duration-700"
				style={{ opacity: 0 }}
			/>
			<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-space-950/80 to-transparent" />

			<SceneLabels />
		</div>
	);
}

/** HTML labels positioned by the render loop (no React renders per frame). */
function SceneLabels() {
	const { t } = useT();
	const label =
		"absolute left-0 top-0 transition-opacity duration-300 data-[visible=0]:opacity-0 data-[visible=1]:opacity-100 will-change-transform";
	return (
		<>
			<div
				ref={(el) => {
					scene.dom.tooltip = el;
				}}
				data-visible="0"
				className={label}
			>
				<div className="glass -translate-x-1/2 -translate-y-[calc(100%+18px)] rounded-xl px-3.5 py-2.5 shadow-2xl">
					<div className="flex items-center gap-2">
						<span
							className="size-2 rounded-full"
							style={{ background: "var(--orbit-color)", boxShadow: "0 0 12px var(--orbit-color)" }}
						/>
						<span data-name className="font-display text-[0.7rem] tracking-wider text-white uppercase" />
					</div>
					<div data-info className="mt-1 font-mono text-[0.68rem] whitespace-nowrap text-muted" />
				</div>
			</div>

			<div
				ref={(el) => {
					scene.dom.venueLabel = el;
				}}
				data-visible="0"
				className={label}
			>
				<div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
					<span className="rounded-full border border-flare/40 bg-space-950/70 px-3 py-1 font-mono text-[0.65rem] tracking-[0.14em] whitespace-nowrap text-flare uppercase backdrop-blur">
						{t("common.venueLabel")}
					</span>
					<span className="h-4 w-px bg-gradient-to-b from-flare/70 to-transparent" />
				</div>
			</div>

			<div
				ref={(el) => {
					scene.dom.countryLabel = el;
				}}
				data-visible="0"
				className={label}
			>
				<span
					data-name
					className="block -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-full border border-flare/40 bg-space-950/75 px-3 py-1 font-mono text-[0.68rem] tracking-[0.14em] whitespace-nowrap text-flare uppercase backdrop-blur"
				/>
			</div>
		</>
	);
}
