import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { live, NOISE_GLSL } from "./shared";

/** Full-screen nebula and the soft halo behind the globe. Drawn first, ignores the camera. */
/** `lite`: two noise octaves instead of four, for phones (the shader covers the whole screen). */
export default function Backdrop({ lite = false }: { lite?: boolean }) {
	const material = useMemo(
		() =>
			new THREE.ShaderMaterial({
				defines: lite ? { FBM_OCTAVES: 2 } : {},
				depthTest: false,
				depthWrite: false,
				uniforms: {
					uRes: { value: new THREE.Vector2(1, 1) },
					uGlobe: { value: new THREE.Vector2(0.7, 0.5) },
					uRadius: { value: 0.3 },
					uTime: { value: 0 },
				},
				vertexShader: /* glsl */ `
					void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
				`,
				fragmentShader: /* glsl */ `
					uniform vec2 uRes;
					uniform vec2 uGlobe;
					uniform float uRadius;
					uniform float uTime;
					${NOISE_GLSL}
					void main() {
						vec2 uv = gl_FragCoord.xy / uRes;
						float aspect = uRes.x / uRes.y;
						vec2 q = uv * vec2(aspect, 1.0);
						vec3 col = vec3(0.008, 0.015, 0.038);

						float n1 = fbm(q * 1.5 + vec2(uTime * 0.004, 0.0));
						float n2 = fbm(q * 2.8 - vec2(0.0, uTime * 0.003) + 11.0);
						col += vec3(0.17, 0.06, 0.32) * smoothstep(0.5, 0.95, n1) * 0.5 * (1.1 - uv.y * 0.6);
						col += vec3(0.02, 0.11, 0.25) * smoothstep(0.5, 0.95, n2) * 0.45;

						vec2 p = (uv - uGlobe) * vec2(aspect, 1.0);
						float d = length(p);
						float halo = exp(-max(d - uRadius, 0.0) / max(uRadius * 0.8, 0.05) * 2.4);
						col += vec3(0.05, 0.13, 0.34) * halo * 0.8;

						vec2 c = (uv - 0.5) * vec2(aspect, 1.0);
						col *= mix(0.6, 1.0, smoothstep(1.3, 0.25, length(c)));
						col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
						gl_FragColor = vec4(col, 1.0);
					}
				`,
			}),
		[lite],
	);

	useFrame(({ gl }) => {
		const u = material.uniforms;
		gl.getDrawingBufferSize(u.uRes.value);
		u.uGlobe.value.set(0.5 + live.cur.fx, 0.5 + live.cur.fy);
		u.uRadius.value = live.cur.rf;
		u.uTime.value = live.time;
	});

	return (
		<mesh frustumCulled={false} renderOrder={-10} material={material}>
			<planeGeometry args={[2, 2]} />
		</mesh>
	);
}
