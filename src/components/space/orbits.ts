import { DEG } from "./geo";

/**
 * Classical orbits drawn around the globe. Geometry is compressed so GEO fits on
 * screen (Earth radius = 1), but the motion is real two-body Kepler motion:
 * periods follow Kepler's third law and eccentric orbits speed up at perigee.
 */
export interface OrbitDef {
	id: string;
	name: string;
	info: string;
	color: string;
	/** Semi-major axis in Earth radii (visual scale). */
	a: number;
	e: number;
	/** Inclination, RAAN and argument of perigee, degrees. */
	i: number;
	raan: number;
	argp: number;
	/** Mean anomaly of each satellite at t = 0, in turns. */
	phases: number[];
}

export const ORBITS: OrbitDef[] = [
	{
		id: "leo",
		name: "LEO",
		info: "h ≈ 420 km · i = 51.6° · T ≈ 92 min",
		color: "#5ef0ff",
		a: 1.32,
		e: 0,
		i: 51.6,
		raan: 20,
		argp: 0,
		phases: [0, 0.5],
	},
	{
		id: "sso",
		name: "Sun-synchronous",
		info: "h ≈ 700 km · i = 98.2° · T ≈ 99 min",
		color: "#a78bfa",
		a: 1.55,
		e: 0,
		i: 98.2,
		raan: 115,
		argp: 0,
		phases: [0.15],
	},
	{
		id: "molniya",
		name: "Molniya",
		info: "e = 0.74 · i = 63.4° · T ≈ 12 h",
		color: "#ff8a3d",
		a: 2.92,
		e: 0.57,
		i: 63.4,
		raan: -35,
		argp: 270,
		phases: [0.05, 0.55],
	},
	{
		id: "gto",
		name: "GTO",
		info: "Hohmann transfer · e ≈ 0.73 · T ≈ 10.5 h",
		color: "#ff6b9a",
		a: 2.285,
		e: 0.4223,
		i: 7,
		raan: 200,
		argp: 180,
		phases: [0.3],
	},
	{
		id: "geo",
		name: "GEO",
		info: "h = 35 786 km · i = 0° · T = 23 h 56 min",
		color: "#4da3ff",
		a: 3.25,
		e: 0,
		i: 0,
		raan: 0,
		argp: 0,
		phases: [0, 1 / 3, 2 / 3],
	},
];

/** Mean motion scale: LEO period ≈ 18 s on screen. */
const K = ((2 * Math.PI) / 18) * Math.pow(1.32, 1.5);
export const meanMotion = (a: number) => K * Math.pow(a, -1.5);
/** Earth turns with GEO so geostationary satellites hold position over the ground. */
export const EARTH_SPIN_RATE = meanMotion(3.25);

export function solveKepler(M: number, e: number) {
	let E = e < 0.8 ? M : Math.PI;
	for (let k = 0; k < 8; k++) {
		const f = E - e * Math.sin(E) - M;
		E -= f / (1 - e * Math.cos(E));
		if (Math.abs(f) < 1e-7) break;
	}
	return E;
}

/**
 * Position on the orbit for eccentric anomaly E, written into `out` in scene
 * coordinates (y = north pole, equator in the x/z plane).
 */
export function orbitPoint(o: OrbitDef, E: number, out: number[] = [0, 0, 0]) {
	const b = o.a * Math.sqrt(1 - o.e * o.e);
	const xp = o.a * (Math.cos(E) - o.e);
	const yp = b * Math.sin(E);

	const cw = Math.cos(o.argp * DEG);
	const sw = Math.sin(o.argp * DEG);
	const ci = Math.cos(o.i * DEG);
	const si = Math.sin(o.i * DEG);
	const cO = Math.cos(o.raan * DEG);
	const sO = Math.sin(o.raan * DEG);

	// Perifocal -> equatorial inertial frame (z = north).
	const x1 = cw * xp - sw * yp;
	const y1 = sw * xp + cw * yp;
	const X = cO * x1 - sO * ci * y1;
	const Y = sO * x1 + cO * ci * y1;
	const Z = si * y1;

	out[0] = X;
	out[1] = Z;
	out[2] = -Y;
	return out;
}
