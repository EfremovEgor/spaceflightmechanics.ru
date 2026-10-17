import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { latLonToXYZ, VENUE } from "../geo";
import { scene } from "../sceneStore";
import { live, placeLabel, projectVisible } from "./shared";

const _w = new THREE.Vector3();
const _n = new THREE.Vector3();
const _toCam = new THREE.Vector3();

/** Pulsing beacon over RUDN University. */
export default function Venue() {
	const root = useRef<THREE.Group>(null);
	const rings = useRef<THREE.Mesh[]>([]);
	const { camera, size } = useThree();

	const { position, quaternion, ringMats, beamMat, coreMat } = useMemo(() => {
		const position = new THREE.Vector3(...latLonToXYZ(VENUE.lat, VENUE.lon, 1.002));
		const quaternion = new THREE.Quaternion().setFromUnitVectors(
			new THREE.Vector3(0, 1, 0),
			position.clone().normalize(),
		);
		const ringMats = [0, 1].map(
			() =>
				new THREE.MeshBasicMaterial({
					color: 0xff8a3d,
					transparent: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending,
					side: THREE.DoubleSide,
				}),
		);
		const coreMat = new THREE.MeshBasicMaterial({ color: 0xffd2a8, transparent: true });
		const beamMat = new THREE.ShaderMaterial({
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			uniforms: { uIntensity: { value: 1 } },
			vertexShader: /* glsl */ `
				varying float vY;
				void main() { vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
			`,
			fragmentShader: /* glsl */ `
				uniform float uIntensity;
				varying float vY;
				void main() { gl_FragColor = vec4(1.0, 0.62, 0.32, (1.0 - vY) * 0.85 * uIntensity); }
			`,
		});
		return { position, quaternion, ringMats, beamMat, coreMat };
	}, []);

	useFrame(() => {
		const k = live.cur.marker;
		const t = live.time;
		rings.current.forEach((m, i) => {
			if (!m) return;
			const phase = (t * 0.55 + i * 0.5) % 1;
			const s = 0.012 + phase * 0.09 * k;
			m.scale.setScalar(s);
			(m.material as THREE.MeshBasicMaterial).opacity = (1 - phase) * 0.9 * Math.min(k, 1);
		});
		beamMat.uniforms.uIntensity.value = Math.min(k, 1.4);
		coreMat.opacity = Math.min(k, 1);
		if (root.current) root.current.scale.setScalar(0.8 + 0.25 * k);

		// Label: shown on pages that talk about the venue, while it faces the camera.
		const el = scene.dom.venueLabel;
		if (!root.current || !el) return;
		root.current.getWorldPosition(_w);
		_n.copy(_w).normalize();
		_toCam.copy(camera.position).sub(_w).normalize();
		const facing = _n.dot(_toCam);
		_w.addScaledVector(_n, 0.12 * (0.8 + 0.25 * k));
		const show =
			(scene.preset === "contact" || scene.preset === "home") && facing > 0.25 && live.intro > 0.9;
		placeLabel(el, show ? projectVisible(_w, camera, size.width, size.height) : null, show);
	});

	return (
		<group ref={root} position={position} quaternion={quaternion}>
			<mesh material={coreMat}>
				<sphereGeometry args={[0.008, 16, 12]} />
			</mesh>
			{ringMats.map((m, i) => (
				<mesh
					key={i}
					ref={(el) => {
						if (el) rings.current[i] = el;
					}}
					material={m}
					rotation-x={-Math.PI / 2}
				>
					<ringGeometry args={[0.82, 1, 64]} />
				</mesh>
			))}
			<mesh material={beamMat} position-y={0.11}>
				<cylinderGeometry args={[0.0016, 0.0016, 0.22, 8, 1, true]} />
			</mesh>
		</group>
	);
}
