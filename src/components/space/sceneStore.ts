import { useSyncExternalStore } from "react";
import type { Lang } from "@/i18n";
import { VENUE } from "./geo";

export type PresetKey =
	| "home"
	| "committee"
	| "sessions"
	| "horizon"
	| "contact"
	| "lost";

/**
 * Where the globe sits for a page. fx/fy shift it from the screen centre in
 * fractions of the viewport (fy > 0 is up), rf is its radius as a fraction of
 * the viewport height. The rest are layer opacities and the view tilt.
 */
export interface Framing {
	fx: number;
	fy: number;
	rf: number;
	pitch: number;
	roll: number;
	orbits: number;
	arcs: number;
	marker: number;
}

interface Preset {
	desktop: Framing;
	mobile: Partial<Framing>;
	/** Framing once the hero has been scrolled past (home only). */
	scrolled?: Partial<Framing>;
	scrolledMobile?: Partial<Framing>;
	focus?: { lat: number; lon: number };
	/** Strength of the dark veil over the scene behind page content. */
	veil: number;
}

const base: Framing = {
	fx: 0.22,
	fy: 0,
	rf: 0.3,
	pitch: 0.3,
	roll: -0.38,
	orbits: 1,
	arcs: 0,
	marker: 1,
};

/**
 * Phones: the globe keeps the same place, size and tilt on every page, so page changes only
 * fade layers instead of flying the camera across a small screen.
 */
const MOBILE: Partial<Framing> = { fx: 0, fy: 0.29, rf: 0.13, pitch: 0.3, roll: -0.38 };

export const PRESETS: Record<PresetKey, Preset> = {
	home: {
		desktop: base,
		mobile: MOBILE,
		scrolled: { fx: 0.3, fy: 0.04, rf: 0.24, orbits: 0.55 },
		scrolledMobile: { ...MOBILE, orbits: 0.4 },
		veil: 0,
	},
	committee: {
		desktop: { ...base, fx: 0.25, rf: 0.29, orbits: 0.12, arcs: 1, roll: 0 },
		mobile: MOBILE,
		focus: { lat: 28, lon: 42 },
		veil: 0.15,
	},
	sessions: {
		desktop: { ...base, fx: 0.27, rf: 0.19, pitch: 0.62, roll: -0.25 },
		mobile: MOBILE,
		veil: 0.2,
	},
	horizon: {
		desktop: {
			...base,
			fx: 0,
			fy: -1.32,
			rf: 1.08,
			pitch: 0.42,
			roll: -0.12,
			orbits: 0.55,
		},
		mobile: MOBILE,
		veil: 0.1,
	},
	contact: {
		desktop: { ...base, fx: 0.25, rf: 0.38, orbits: 0.2, marker: 1.6, roll: 0 },
		mobile: MOBILE,
		focus: VENUE,
		veil: 0.15,
	},
	lost: {
		desktop: { ...base, fx: 0.3, fy: 0.2, rf: 0.07, pitch: 0.5 },
		mobile: MOBILE,
		veil: 0,
	},
};

export function presetForPath(pathname: string): PresetKey {
	const p = pathname.replace(/^\/ru(?=\/|$)/, "").replace(/\/+$/, "") || "/";
	if (p === "/") return "home";
	if (p === "/committee") return "committee";
	if (p.startsWith("/sessions-and-highlights")) return "sessions";
	if (p === "/registration" || p === "/abstract-submission") return "horizon";
	if (p === "/contact") return "contact";
	return "lost";
}

/**
 * Mutable state shared between the DOM and the render loop. The scene reads it
 * every frame, so writes never cause React renders; the few values the DOM
 * displays go through `subscribe`/`useSceneValue`.
 */
export const scene = {
	preset: "home" as PresetKey,
	lang: "en" as Lang,
	scrollY: 0,
	viewportH: 800,
	pointer: { x: 0, y: 0, clientX: -1, clientY: -1, overStage: false },
	drag: { active: false, dx: 0, dy: 0 },
	/** Orbit highlighted from the DOM legend. */
	highlightOrbit: null as string | null,
	/** Orbit under the pointer in the scene. */
	hoverOrbit: null as string | null,
	/** Committee country highlighted from the member list. */
	focusCountry: null as string | null,
	reducedMotion: false,
	/** WebGL scene has rendered its first frames. */
	ready: false,
	/** First-visit loader has opened (or was skipped). */
	booted: false,
	dom: {
		tooltip: null as HTMLDivElement | null,
		venueLabel: null as HTMLDivElement | null,
		countryLabel: null as HTMLDivElement | null,
	},
};

const listeners = new Set<() => void>();
export function emit() {
	listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
	listeners.add(l);
	return () => listeners.delete(l);
}

export function setSceneValue<
	K extends "highlightOrbit" | "hoverOrbit" | "focusCountry" | "ready" | "booted",
>(
	key: K,
	value: (typeof scene)[K],
) {
	if (scene[key] === value) return;
	scene[key] = value;
	emit();
}

export function useSceneValue<T>(select: (s: typeof scene) => T): T {
	return useSyncExternalStore(
		subscribe,
		() => select(scene),
		() => select(scene),
	);
}
