import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { live } from "./shared";

const PALETTE = [
	[0.82, 0.9, 1],
	[1, 0.88, 0.74],
	[0.62, 0.76, 1],
	[0.95, 0.95, 1],
];

export default function Starfield({ count }: { count: number }) {
	const ref = useRef<THREE.Points>(null);
	const dpr = useThree((s) => s.viewport.dpr);

	const [geometry, material] = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const size = new Float32Array(count);
		const phase = new Float32Array(count);
		const color = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const u = Math.random() * 2 - 1;
			const th = Math.random() * Math.PI * 2;
			const r = 140 + Math.random() * 160;
			const s = Math.sqrt(1 - u * u);
			pos.set([r * s * Math.cos(th), r * u, r * s * Math.sin(th)], i * 3);
			const big = Math.random();
			size[i] = big > 0.985 ? 3.6 : big > 0.9 ? 2.4 : 1.1 + Math.random() * 0.9;
			phase[i] = Math.random();
			color.set(PALETTE[(Math.random() * PALETTE.length) | 0], i * 3);
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
		g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
		g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
		g.setAttribute("aColor", new THREE.BufferAttribute(color, 3));

		const m = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 } },
			vertexShader: /* glsl */ `
				attribute float aSize;
				attribute float aPhase;
				attribute vec3 aColor;
				uniform float uTime;
				uniform float uPixelRatio;
				varying vec3 vColor;
				varying float vTw;
				void main() {
					vec4 mv = modelViewMatrix * vec4(position, 1.0);
					gl_Position = projectionMatrix * mv;
					float tw = 0.62 + 0.38 * sin(uTime * (0.5 + aPhase * 2.4) + aPhase * 40.0);
					vTw = tw;
					vColor = aColor;
					gl_PointSize = aSize * uPixelRatio * (0.85 + 0.35 * tw);
				}
			`,
			fragmentShader: /* glsl */ `
				varying vec3 vColor;
				varying float vTw;
				void main() {
					float d = length(gl_PointCoord - 0.5);
					float a = pow(smoothstep(0.5, 0.0, d), 2.0) * vTw;
					gl_FragColor = vec4(vColor, a);
				}
			`,
		});
		return [g, m];
	}, [count]);

	useFrame((_, dt) => {
		material.uniforms.uTime.value = live.time;
		material.uniforms.uPixelRatio.value = dpr;
		if (ref.current) {
			ref.current.rotation.y = live.yaw * 0.12 + live.time * 0.004;
			ref.current.rotation.x += dt * 0.0006;
		}
	});

	return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
