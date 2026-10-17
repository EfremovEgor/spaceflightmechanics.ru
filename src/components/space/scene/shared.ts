import * as THREE from "three";
import { PRESETS, type Framing } from "../sceneStore";

/** Values the rig computes each frame and the other scene parts read. */
export const live = {
	time: 0,
	spin: 0,
	yaw: 0,
	cur: { ...PRESETS.home.desktop } as Framing,
	/** 0 → 1 over the first seconds, drives the intro draw-on. */
	intro: 0,
	sunDir: new THREE.Vector3(-0.85, 0.45, 0.62).normalize(),
	pointerOnGlobe: new THREE.Vector3(0, 0, 1),
	pointerStrength: 0,
};

export const vec3 = (hex: string) => {
	const n = parseInt(hex.slice(1), 16);
	return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

export const damp = (from: number, to: number, lambda: number, dt: number) =>
	from + (to - from) * (1 - Math.exp(-lambda * dt));

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const smoothstep = (a: number, b: number, v: number) => {
	const t = clamp01((v - a) / (b - a));
	return t * t * (3 - 2 * t);
};

export const wrapPi = (a: number) => {
	a = (a + Math.PI) % (Math.PI * 2);
	if (a < 0) a += Math.PI * 2;
	return a - Math.PI;
};

const _v = new THREE.Vector3();
const _oc = new THREE.Vector3();

/** Projects a world point to CSS pixels; returns null when off screen or hidden behind the globe. */
export function projectVisible(
	world: THREE.Vector3,
	camera: THREE.Camera,
	width: number,
	height: number,
	globeRadius = 1,
) {
	// Occlusion by the globe (centred at the origin).
	const dir = _v.copy(world).sub(camera.position);
	const dist = dir.length();
	dir.divideScalar(dist);
	_oc.copy(camera.position).negate();
	const tca = _oc.dot(dir);
	const d2 = _oc.lengthSq() - tca * tca;
	if (tca > 0 && d2 < globeRadius * globeRadius) {
		const t0 = tca - Math.sqrt(globeRadius * globeRadius - d2);
		if (t0 < dist - 1e-3) return null;
	}
	_v.copy(world).project(camera);
	if (_v.z > 1 || _v.x < -1.1 || _v.x > 1.1 || _v.y < -1.1 || _v.y > 1.1) return null;
	return { x: ((_v.x + 1) / 2) * width, y: ((1 - _v.y) / 2) * height };
}

export function placeLabel(
	el: HTMLElement | null,
	pos: { x: number; y: number } | null,
	visible: boolean,
) {
	if (!el) return;
	if (!pos || !visible) {
		if (el.dataset.visible !== "0") el.dataset.visible = "0";
		return;
	}
	el.dataset.visible = "1";
	el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
}

export const NOISE_GLSL = /* glsl */ `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
	           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
	return v;
}
`;
