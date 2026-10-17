import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import i18n from "@/i18n";
import { meanMotion, orbitPoint, ORBITS, solveKepler, type OrbitDef } from "../orbits";
import { scene, setSceneValue } from "../sceneStore";
import { clamp01, damp, live, placeLabel, projectVisible, vec3 } from "./shared";

/** Parametrised by eccentric anomaly; skips arc-length remapping so uv.x = E / 2π. */
class OrbitCurve extends THREE.Curve<THREE.Vector3> {
	private tmp = [0, 0, 0];
	constructor(private orbit: OrbitDef) {
		super();
	}
	getPoint(t: number, target = new THREE.Vector3()) {
		const p = orbitPoint(this.orbit, t * Math.PI * 2, this.tmp);
		return target.set(p[0], p[1], p[2]);
	}
	getPointAt(u: number, target?: THREE.Vector3) {
		return this.getPoint(u, target);
	}
	getTangentAt(u: number, target?: THREE.Vector3) {
		return this.getTangent(u, target);
	}
}

const SATS = ORBITS.flatMap((o, oi) => o.phases.map((phase) => ({ orbit: o, oi, phase })));

const _w = new THREE.Vector3();

export default function Orbits() {
	const group = useRef<THREE.Group>(null);
	const { camera, size } = useThree();
	const dpr = useThree((s) => s.viewport.dpr);
	const highlight = useRef(ORBITS.map(() => 1));
	const lastTooltip = useRef<string | null>(null);

	const { tubes, satGeo, satMat } = useMemo(() => {
		const tubes = ORBITS.map((o) => {
			const geo = new THREE.TubeGeometry(new OrbitCurve(o), 360, 0.0045, 6, true);
			const mat = new THREE.ShaderMaterial({
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
				uniforms: {
					uColor: { value: vec3(o.color) },
					uE: { value: o.e },
					uPhases: { value: new THREE.Vector3(...[0, 1, 2].map((k) => o.phases[k] ?? 0)) },
					uCount: { value: o.phases.length },
					uOpacity: { value: 1 },
					uReveal: { value: 0 },
				},
				vertexShader: /* glsl */ `
					varying float vE;
					void main() {
						vE = uv.x;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: /* glsl */ `
					uniform vec3 uColor;
					uniform float uE;
					uniform vec3 uPhases;
					uniform float uCount;
					uniform float uOpacity;
					uniform float uReveal;
					varying float vE;
					const float TAU = 6.28318530718;
					void main() {
						float E = vE * TAU;
						// Mean anomaly along the tube: the trail is the last stretch of flight time.
						float m = (E - uE * sin(E)) / TAU;
						float trail = 0.0;
						for (int k = 0; k < 3; k++) {
							if (float(k) >= uCount) break;
							float behind = fract(uPhases[k] - m);
							trail = max(trail, exp(-behind * 7.0));
						}
						float a = (0.14 + 0.86 * trail) * uOpacity;
						a *= 1.0 - smoothstep(uReveal - 0.05, uReveal, vE);
						gl_FragColor = vec4(uColor * (0.75 + trail * 0.9), a);
					}
				`,
			});
			return { geo, mat };
		});

		const satGeo = new THREE.BufferGeometry();
		satGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SATS.length * 3), 3));
		satGeo.setAttribute("aScale", new THREE.BufferAttribute(new Float32Array(SATS.length).fill(1), 1));
		satGeo.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(SATS.length).fill(1), 1));
		const col = new Float32Array(SATS.length * 3);
		SATS.forEach((s, i) => col.set(vec3(s.orbit.color).toArray(), i * 3));
		satGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
		satGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);

		const satMat = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			uniforms: { uPixelRatio: { value: 1 } },
			vertexShader: /* glsl */ `
				attribute vec3 aColor;
				attribute float aScale;
				attribute float aAlpha;
				uniform float uPixelRatio;
				varying vec3 vColor;
				varying float vAlpha;
				void main() {
					vec4 mv = modelViewMatrix * vec4(position, 1.0);
					gl_Position = projectionMatrix * mv;
					gl_PointSize = 24.0 * aScale * uPixelRatio;
					vColor = aColor;
					vAlpha = aAlpha;
				}
			`,
			fragmentShader: /* glsl */ `
				varying vec3 vColor;
				varying float vAlpha;
				void main() {
					float d = length(gl_PointCoord - 0.5);
					float core = smoothstep(0.09, 0.02, d);
					float glow = exp(-d * d * 30.0) * 0.85;
					gl_FragColor = vec4(mix(vColor, vec3(1.0), core), (core + glow) * vAlpha);
				}
			`,
		});

		return { tubes, satGeo, satMat };
	}, []);

	useFrame((_, rawDt) => {
		const dt = Math.min(rawDt, 0.05);
		const g = group.current;
		if (!g) return;
		const opacity = live.cur.orbits;
		g.visible = opacity > 0.01;
		if (!g.visible) {
			placeLabel(scene.dom.tooltip, null, false);
			if (scene.hoverOrbit) setSceneValue("hoverOrbit", null);
			return;
		}
		g.updateMatrixWorld();

		const t = live.time;
		const active = scene.highlightOrbit ?? scene.hoverOrbit;

		ORBITS.forEach((o, i) => {
			const target = active ? (active === o.id ? 1.9 : 0.3) : 1;
			highlight.current[i] = damp(highlight.current[i], target, 6, dt);
			const reveal = clamp01(live.intro * 1.35 - i * 0.1) * 1.06;
			const u = tubes[i].mat.uniforms;
			u.uOpacity.value = opacity * highlight.current[i];
			u.uReveal.value = reveal;
			const n = meanMotion(o.a) * (scene.reducedMotion ? 0.3 : 1);
			o.phases.forEach((p0, k) => {
				const M = ((p0 + (n * t) / (Math.PI * 2)) % 1 + 1) % 1;
				(u.uPhases.value as THREE.Vector3).setComponent(k, M);
			});
		});

		// Satellites + screen-space hover.
		const pos = satGeo.attributes.position as THREE.BufferAttribute;
		const scale = satGeo.attributes.aScale as THREE.BufferAttribute;
		const alpha = satGeo.attributes.aAlpha as THREE.BufferAttribute;
		const p = [0, 0, 0];
		let best: { i: number; d: number; x: number; y: number } | null = null;
		let anchor: { x: number; y: number } | null = null;
		const px = scene.pointer.clientX;
		const py = scene.pointer.clientY;

		for (let i = 0; i < SATS.length; i++) {
			const s = SATS[i];
			const n = meanMotion(s.orbit.a) * (scene.reducedMotion ? 0.3 : 1);
			const M = (s.phase + (n * t) / (Math.PI * 2)) * Math.PI * 2;
			orbitPoint(s.orbit, solveKepler(M % (Math.PI * 2), s.orbit.e), p);
			pos.setXYZ(i, p[0], p[1], p[2]);

			const hl = highlight.current[s.oi];
			const reveal = clamp01((live.intro * 1.35 - s.oi * 0.1 - 0.6) * 3);
			alpha.setX(i, Math.min(1, opacity * hl) * reveal);
			scale.setX(i, active === s.orbit.id ? 1.35 : 1);

			_w.set(p[0], p[1], p[2]).applyMatrix4(g.matrixWorld);
			const sp = projectVisible(_w, camera, size.width, size.height);
			if (!sp) continue;
			if (scene.highlightOrbit === s.orbit.id && !anchor) anchor = sp;
			if (scene.pointer.overStage && !scene.drag.active) {
				const d = Math.hypot(sp.x - px, sp.y - py);
				if (d < 26 && (!best || d < best.d)) best = { i, d, ...sp };
			}
		}
		pos.needsUpdate = true;
		scale.needsUpdate = true;
		alpha.needsUpdate = true;
		satMat.uniforms.uPixelRatio.value = dpr;

		const hovered = best ? SATS[best.i].orbit.id : null;
		if (hovered !== scene.hoverOrbit) setSceneValue("hoverOrbit", hovered);

		const tipOrbit = hovered ?? scene.highlightOrbit;
		const tipPos = best ?? anchor;
		const el = scene.dom.tooltip;
		const tipKey = `${tipOrbit}:${scene.lang}`;
		if (el && tipKey !== lastTooltip.current) {
			const o = ORBITS.find((x) => x.id === tipOrbit);
			if (o) {
				const t = i18n.getFixedT(scene.lang);
				el.style.setProperty("--orbit-color", o.color);
				el.querySelector("[data-name]")!.textContent = t(`orbits.${o.id}.name`);
				el.querySelector("[data-info]")!.textContent = t(`orbits.${o.id}.info`);
			}
			lastTooltip.current = tipKey;
		}
		placeLabel(el, tipPos, !!tipOrbit && opacity > 0.3);
		document.documentElement.classList.toggle("is-sat-hover", !!hovered);
	});

	return (
		<group ref={group}>
			{tubes.map((t, i) => (
				<mesh key={ORBITS[i].id} geometry={t.geo} material={t.mat} />
			))}
			<points geometry={satGeo} material={satMat} frustumCulled={false} />
		</group>
	);
}
