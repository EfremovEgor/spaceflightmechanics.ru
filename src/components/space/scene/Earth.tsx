import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LAND_MASK_B64, LAND_POINTS_COUNT, LAND_POINTS_TOTAL } from "../data/landMask";
import { scene } from "../sceneStore";
import { damp, live } from "./shared";

function buildLandGeometry() {
	const bin = atob(LAND_MASK_B64);
	const pos = new Float32Array(LAND_POINTS_COUNT * 3);
	const rand = new Float32Array(LAND_POINTS_COUNT);
	const GA = Math.PI * (3 - Math.sqrt(5));
	const N = LAND_POINTS_TOTAL;
	let k = 0;
	for (let i = 0; i < N; i++) {
		if (!(bin.charCodeAt(i >> 3) & (1 << (i & 7)))) continue;
		// Same Fibonacci lattice as the generator: lat from y, lon from the golden angle.
		const y = 1 - ((i + 0.5) * 2) / N;
		const r = Math.sqrt(1 - y * y);
		const th = GA * i;
		const lon = Math.atan2(Math.sin(th), Math.cos(th));
		pos[k * 3] = r * Math.sin(lon) * 1.004;
		pos[k * 3 + 1] = y * 1.004;
		pos[k * 3 + 2] = r * Math.cos(lon) * 1.004;
		rand[k] = Math.random();
		k++;
	}
	const g = new THREE.BufferGeometry();
	g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
	g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
	g.computeBoundingSphere();
	return g;
}

const _ray = new THREE.Raycaster();
const _sphere = new THREE.Sphere(new THREE.Vector3(), 1);
const _hit = new THREE.Vector3();
const _ndc = new THREE.Vector2();

export default function Earth() {
	const group = useRef<THREE.Group>(null);
	const { camera, gl } = useThree();

	const { landGeo, oceanMat, dotsMat, atmoMat } = useMemo(() => {
		const shared = {
			uSunDir: { value: live.sunDir },
			uPointer: { value: new THREE.Vector3(0, 0, 1) },
			uPointerStrength: { value: 0 },
			uTime: { value: 0 },
		};

		const oceanMat = new THREE.ShaderMaterial({
			uniforms: shared,
			vertexShader: /* glsl */ `
				varying vec3 vN;
				varying vec3 vObjN;
				varying vec3 vWorldPos;
				void main() {
					vObjN = normalize(position);
					vN = normalize(mat3(modelMatrix) * normal);
					vec4 wp = modelMatrix * vec4(position, 1.0);
					vWorldPos = wp.xyz;
					gl_Position = projectionMatrix * viewMatrix * wp;
				}
			`,
			fragmentShader: /* glsl */ `
				uniform vec3 uSunDir;
				uniform vec3 uPointer;
				uniform float uPointerStrength;
				uniform float uTime;
				varying vec3 vN;
				varying vec3 vObjN;
				varying vec3 vWorldPos;
				float gridLine(float x, float stepRad) {
					float v = x / stepRad;
					float w = fwidth(v);
					float f = abs(fract(v - 0.5) - 0.5);
					return 1.0 - smoothstep(0.0, w * 1.4, f);
				}
				void main() {
					vec3 n = normalize(vN);
					vec3 V = normalize(cameraPosition - vWorldPos);
					float ndl = dot(n, uSunDir);
					float day = smoothstep(-0.25, 0.6, ndl);
					vec3 col = mix(vec3(0.010, 0.020, 0.050), vec3(0.030, 0.070, 0.160), day);
					float fres = pow(1.0 - clamp(dot(n, V), 0.0, 1.0), 3.0);
					col += vec3(0.20, 0.50, 1.0) * fres * (0.3 + 0.55 * day);

					vec3 o = normalize(vObjN);
					float lat = asin(clamp(o.y, -1.0, 1.0));
					float lon = atan(o.x, o.z);
					float g = max(gridLine(lat, 0.2617994), gridLine(lon, 0.2617994) * smoothstep(0.98, 0.85, abs(o.y)));
					col += vec3(0.25, 0.55, 1.0) * g * (0.045 + 0.07 * day);

					float pd = acos(clamp(dot(o, uPointer), -1.0, 1.0));
					float ring = smoothstep(0.012, 0.0, abs(pd - 0.17 - 0.025 * sin(uTime * 3.0)));
					col += vec3(0.35, 0.85, 1.0) * uPointerStrength * (ring * 0.45 + smoothstep(0.32, 0.0, pd) * 0.07);
					gl_FragColor = vec4(col, 1.0);
				}
			`,
		});

		const dotsMat = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			uniforms: {
				...shared,
				uSize: { value: 0.0105 },
				uScale: { value: 800 },
			},
			vertexShader: /* glsl */ `
				attribute float aRand;
				uniform float uTime;
				uniform float uSize;
				uniform float uScale;
				uniform float uPointerStrength;
				uniform vec3 uPointer;
				uniform vec3 uSunDir;
				varying float vDay;
				varying float vLift;
				varying float vScan;
				varying float vFacing;
				varying float vRand;
				void main() {
					vec3 o = normalize(position);
					float pd = acos(clamp(dot(o, uPointer), -1.0, 1.0));
					float lift = uPointerStrength * smoothstep(0.34, 0.0, pd);
					vec3 p = position * (1.0 + lift * 0.045);
					vec4 mv = modelViewMatrix * vec4(p, 1.0);
					gl_Position = projectionMatrix * mv;

					vec3 nW = normalize(mat3(modelMatrix) * o);
					vDay = smoothstep(-0.2, 0.35, dot(nW, uSunDir));
					vec3 nV = normalize(normalMatrix * o);
					vFacing = dot(nV, normalize(-mv.xyz));

					float lat01 = o.y * 0.5 + 0.5;
					float s = fract(uTime * 0.045) * 1.3 - 0.15;
					vScan = exp(-pow((lat01 - s) * 26.0, 2.0));
					vLift = lift;
					vRand = aRand;
					gl_PointSize = uSize * uScale / -mv.z * (1.0 + lift * 0.9);
				}
			`,
			fragmentShader: /* glsl */ `
				varying float vDay;
				varying float vLift;
				varying float vScan;
				varying float vFacing;
				varying float vRand;
				void main() {
					float d = length(gl_PointCoord - 0.5);
					if (d > 0.5) discard;
					float a = smoothstep(0.5, 0.22, d);
					vec3 col = mix(vec3(0.10, 0.19, 0.42), vec3(0.52, 0.82, 1.0), vDay);
					float city = step(0.86, vRand) * (1.0 - vDay);
					col = mix(col, vec3(1.0, 0.66, 0.30), city * 0.95);
					col += vec3(0.45, 0.95, 1.0) * (vLift * 1.1 + vScan * 0.4);
					a *= smoothstep(0.0, 0.32, vFacing) * mix(0.5, 1.0, max(vDay, city));
					gl_FragColor = vec4(col, a);
				}
			`,
		});

		const atmoMat = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			uniforms: { uSunDir: shared.uSunDir },
			vertexShader: /* glsl */ `
				varying vec3 vN;
				varying vec3 vV;
				varying vec3 vNW;
				void main() {
					vec4 mv = modelViewMatrix * vec4(position, 1.0);
					vN = normalize(normalMatrix * normal);
					vNW = normalize(mat3(modelMatrix) * normal);
					vV = normalize(-mv.xyz);
					gl_Position = projectionMatrix * mv;
				}
			`,
			fragmentShader: /* glsl */ `
				uniform vec3 uSunDir;
				varying vec3 vN;
				varying vec3 vV;
				varying vec3 vNW;
				void main() {
					float rim = clamp(-dot(normalize(vN), normalize(vV)) * 1.85, 0.0, 1.0);
					float glow = pow(rim, 2.6);
					float sun = smoothstep(-0.4, 0.8, dot(normalize(vNW), uSunDir));
					vec3 col = mix(vec3(0.16, 0.36, 0.95), vec3(0.45, 0.78, 1.0), sun);
					gl_FragColor = vec4(col, glow * (0.45 + 0.75 * sun));
				}
			`,
		});

		return { landGeo: buildLandGeometry(), oceanMat, dotsMat, atmoMat };
	}, []);

	useFrame((_, dt) => {
		const u = oceanMat.uniforms;
		u.uTime.value = live.time;

		// Size dots in world units so they keep their spacing at any zoom.
		const h = gl.getContext().drawingBufferHeight;
		const fov = (camera as THREE.PerspectiveCamera).fov;
		dotsMat.uniforms.uScale.value = h / (2 * Math.tan((fov * Math.PI) / 360));

		// Cursor scanner: where the pointer ray meets the globe, in globe coordinates.
		let target = 0;
		if (scene.pointer.overStage && group.current) {
			_ndc.set(scene.pointer.x, scene.pointer.y);
			_ray.setFromCamera(_ndc, camera);
			if (_ray.ray.intersectSphere(_sphere, _hit)) {
				group.current.worldToLocal(_hit);
				u.uPointer.value.copy(_hit).normalize();
				target = 1;
			}
		}
		live.pointerStrength = damp(live.pointerStrength, target, target ? 6 : 3, Math.min(dt, 0.05));
		u.uPointerStrength.value = live.pointerStrength;
	});

	return (
		<group ref={group}>
			<mesh material={oceanMat}>
				<sphereGeometry args={[1, 96, 64]} />
			</mesh>
			<points geometry={landGeo} material={dotsMat} />
			<mesh material={atmoMat} scale={1.17}>
				<sphereGeometry args={[1, 64, 48]} />
			</mesh>
		</group>
	);
}
