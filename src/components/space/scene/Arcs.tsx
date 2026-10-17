import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import i18n from "@/i18n";
import { COUNTRY_COORDS, latLonToXYZ, VENUE } from "../geo";
import { scene } from "../sceneStore";
import { clamp01, damp, live, placeLabel, projectVisible, vec3 } from "./shared";

const _w = new THREE.Vector3();

/** Great-circle links from Moscow to the home countries of the program committee. */
export default function Arcs() {
	const group = useRef<THREE.Group>(null);
	const reveal = useRef(0);
	const hi = useRef<number[]>([]);
	const lastCountry = useRef<string | null>(null);
	const { camera, size } = useThree();
	const dpr = useThree((s) => s.viewport.dpr);

	const { arcs, endGeo, endMat } = useMemo(() => {
		const from = new THREE.Vector3(...latLonToXYZ(VENUE.lat, VENUE.lon));
		const list = Object.entries(COUNTRY_COORDS).filter(([c]) => c !== "Russia");

		const arcs = list.map(([country, ll], idx) => {
			const to = new THREE.Vector3(...latLonToXYZ(ll.lat, ll.lon));
			const angle = from.angleTo(to);
			const lift = 0.05 + angle * 0.17;
			const pts: THREE.Vector3[] = [];
			for (let i = 0; i <= 48; i++) {
				const t = i / 48;
				const a = Math.sin((1 - t) * angle) / Math.sin(angle);
				const b = Math.sin(t * angle) / Math.sin(angle);
				pts.push(
					from
						.clone()
						.multiplyScalar(a)
						.addScaledVector(to, b)
						.multiplyScalar(1.003 + lift * Math.sin(Math.PI * t)),
				);
			}
			const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 96, 0.0034, 5, false);
			const mat = new THREE.ShaderMaterial({
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
				uniforms: {
					uTime: { value: 0 },
					uOffset: { value: idx * 0.137 },
					uOpacity: { value: 0 },
					uHi: { value: 0 },
					uReveal: { value: 0 },
					uColor: { value: vec3("#4da3ff") },
					uHiColor: { value: vec3("#ffb27a") },
				},
				vertexShader: /* glsl */ `
					varying float vT;
					void main() { vT = uv.x; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
				`,
				fragmentShader: /* glsl */ `
					uniform float uTime;
					uniform float uOffset;
					uniform float uOpacity;
					uniform float uHi;
					uniform float uReveal;
					uniform vec3 uColor;
					uniform vec3 uHiColor;
					varying float vT;
					void main() {
						float head = fract(uTime * 0.28 + uOffset);
						float pulse = exp(-pow((vT - head) * 9.0, 2.0));
						float a = (0.2 + 0.55 * uHi + pulse * (0.8 + uHi)) * uOpacity;
						a *= 1.0 - smoothstep(uReveal - 0.05, uReveal, vT);
						vec3 col = mix(uColor, uHiColor, uHi) * (0.85 + pulse * 0.8);
						gl_FragColor = vec4(col, a);
					}
				`,
			});
			return { country, geo, mat, end: to.clone().multiplyScalar(1.004) };
		});

		const endGeo = new THREE.BufferGeometry();
		endGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(arcs.flatMap((a) => a.end.toArray())), 3),
		);
		endGeo.setAttribute("aHi", new THREE.BufferAttribute(new Float32Array(arcs.length), 1));
		const endMat = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			uniforms: { uOpacity: { value: 0 }, uPixelRatio: { value: 1 }, uTime: { value: 0 } },
			vertexShader: /* glsl */ `
				attribute float aHi;
				uniform float uPixelRatio;
				uniform float uTime;
				varying float vHi;
				void main() {
					vec4 mv = modelViewMatrix * vec4(position, 1.0);
					gl_Position = projectionMatrix * mv;
					vHi = aHi;
					gl_PointSize = (10.0 + aHi * 14.0 + sin(uTime * 3.0) * 1.5) * uPixelRatio;
				}
			`,
			fragmentShader: /* glsl */ `
				uniform float uOpacity;
				varying float vHi;
				void main() {
					float d = length(gl_PointCoord - 0.5);
					float core = smoothstep(0.14, 0.04, d);
					float glow = exp(-d * d * 22.0) * 0.7;
					vec3 col = mix(vec3(0.45, 0.75, 1.0), vec3(1.0, 0.72, 0.45), vHi);
					gl_FragColor = vec4(mix(col, vec3(1.0), core), (core + glow) * uOpacity);
				}
			`,
		});
		return { arcs, endGeo, endMat };
	}, []);

	useFrame((_, rawDt) => {
		const dt = Math.min(rawDt, 0.05);
		const g = group.current;
		if (!g) return;
		const opacity = live.cur.arcs;
		g.visible = opacity > 0.01;
		if (!g.visible) {
			reveal.current = 0;
			placeLabel(scene.dom.countryLabel, null, false);
			return;
		}
		reveal.current += dt * 0.6;
		const focus = scene.focusCountry;
		const hiAttr = endGeo.attributes.aHi as THREE.BufferAttribute;

		arcs.forEach((a, i) => {
			hi.current[i] = damp(hi.current[i] ?? 0, focus === a.country ? 1 : 0, 6, dt);
			const dim = focus && focus !== a.country ? 0.35 : 1;
			const u = a.mat.uniforms;
			u.uTime.value = live.time;
			u.uOpacity.value = opacity * dim;
			u.uHi.value = hi.current[i];
			u.uReveal.value = clamp01(reveal.current * 1.5 - i * 0.05) * 1.06;
			hiAttr.setX(i, hi.current[i]);
		});
		hiAttr.needsUpdate = true;
		endMat.uniforms.uOpacity.value = opacity * clamp01(reveal.current * 1.5 - 0.6);
		endMat.uniforms.uPixelRatio.value = dpr;
		endMat.uniforms.uTime.value = live.time;

		const el = scene.dom.countryLabel;
		const arc = focus ? arcs.find((a) => a.country === focus) : null;
		const labelKey = `${focus}:${scene.lang}`;
		if (el && labelKey !== lastCountry.current) {
			el.querySelector("[data-name]")!.textContent = focus
				? i18n.getFixedT(scene.lang)(`countries.${focus}`, { defaultValue: focus })
				: "";
			lastCountry.current = labelKey;
		}
		if (arc) {
			g.updateMatrixWorld();
			_w.copy(arc.end).applyMatrix4(g.matrixWorld);
			placeLabel(el, projectVisible(_w, camera, size.width, size.height, 0.99), true);
		} else {
			placeLabel(el, null, false);
		}
	});

	return (
		<group ref={group}>
			{arcs.map((a) => (
				<mesh key={a.country} geometry={a.geo} material={a.mat} />
			))}
			<points geometry={endGeo} material={endMat} frustumCulled={false} />
		</group>
	);
}
