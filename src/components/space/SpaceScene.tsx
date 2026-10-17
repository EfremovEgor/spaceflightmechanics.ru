import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COUNTRY_COORDS, DEG, greatCircleMid, VENUE } from "./geo";
import { EARTH_SPIN_RATE } from "./orbits";
import { PRESETS, scene, setSceneValue, type Framing } from "./sceneStore";
import Arcs from "./scene/Arcs";
import Backdrop from "./scene/Backdrop";
import Earth from "./scene/Earth";
import Orbits from "./scene/Orbits";
import Starfield from "./scene/Starfield";
import Venue from "./scene/Venue";
import { clamp01, damp, live, smoothstep, wrapPi } from "./scene/shared";

const KEYS = Object.keys(PRESETS.home.desktop) as (keyof Framing)[];

function targetFraming(portrait: boolean): Framing {
	const p = PRESETS[scene.preset];
	const t: Framing = { ...p.desktop, ...(portrait ? p.mobile : {}) };
	if (p.scrolled) {
		const k = smoothstep(0, 1, scene.scrollY / (scene.viewportH * 0.9));
		const s: Framing = { ...t, ...p.scrolled, ...(portrait ? p.scrolledMobile : {}) };
		for (const key of KEYS) t[key] = t[key] + (s[key] - t[key]) * k;
	}
	return t;
}

/** Drives the camera framing, globe orientation and user rotation every frame. */
function World() {
	const tilt = useRef<THREE.Group>(null);
	const yawGroup = useRef<THREE.Group>(null);
	const earth = useRef<THREE.Group>(null);
	const { camera, size } = useThree();
	const motion = useRef({ yawVel: 0, userPitch: 0, pitch: 0.3, roll: -0.38, px: 0, py: 0, frames: 0 });

	useEffect(() => {
		const portrait = size.width / size.height < 0.85;
		Object.assign(live.cur, targetFraming(portrait));
		// Start smaller and further right, then settle in during the intro.
		live.cur.rf *= 0.55;
		live.cur.orbits = 0;
		return () => setSceneValue("ready", false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useFrame((_, rawDt) => {
		const dt = Math.min(rawDt, 0.05);
		const m = motion.current;
		const slow = scene.reducedMotion ? 0.25 : 1;
		live.time += dt;
		if (!scene.ready && ++m.frames > 4) setSceneValue("ready", true);
		if (scene.booted) live.intro = Math.min(1, live.intro + dt * (scene.reducedMotion ? 2 : 0.42));

		const portrait = size.width / size.height < 0.85;
		const target = targetFraming(portrait);
		const cur = live.cur;
		for (const key of KEYS) cur[key] = damp(cur[key], target[key], key === "rf" ? 1.8 : 2.2, dt);

		live.spin += dt * EARTH_SPIN_RATE * slow;

		const preset = PRESETS[scene.preset];
		const country = scene.focusCountry ? COUNTRY_COORDS[scene.focusCountry] : null;
		const focus = country ? greatCircleMid(VENUE, country) : preset.focus;

		const drag = scene.drag;
		if (drag.active) {
			live.yaw += drag.dx * 0.006;
			m.userPitch = Math.max(-0.7, Math.min(0.7, m.userPitch + drag.dy * 0.004));
			m.yawVel = dt > 0 ? (drag.dx * 0.006) / dt : 0;
			drag.dx = 0;
			drag.dy = 0;
		} else {
			m.userPitch = damp(m.userPitch, 0, 0.8, dt);
			if (focus) {
				const want = -(live.spin + focus.lon * DEG);
				live.yaw += wrapPi(want - live.yaw) * (1 - Math.exp(-2.4 * dt));
				m.yawVel = 0;
			} else {
				live.yaw += (m.yawVel + 0.035 * slow) * dt;
				m.yawVel *= Math.exp(-2.2 * dt);
			}
		}

		m.pitch = damp(m.pitch, focus ? focus.lat * DEG * 0.85 : cur.pitch, 2.4, dt);
		m.roll = damp(m.roll, focus ? 0 : cur.roll, 2.4, dt);
		if (tilt.current) tilt.current.rotation.set(m.pitch + m.userPitch, 0, m.roll);
		if (yawGroup.current) yawGroup.current.rotation.y = live.yaw;
		if (earth.current) earth.current.rotation.y = live.spin;

		// Camera distance from the wanted on-screen radius (exact for a sphere).
		const cam = camera as THREE.PerspectiveCamera;
		const tanHalf = Math.tan((cam.fov * DEG) / 2);
		const d = 1 / Math.sin(Math.atan(2 * Math.max(cur.rf, 0.02) * tanHalf));
		m.px = damp(m.px, scene.pointer.x, 1.6, dt);
		m.py = damp(m.py, scene.pointer.y, 1.6, dt);
		const par = scene.reducedMotion ? 0 : 1;
		cam.position.set(m.px * d * 0.05 * par, m.py * d * 0.035 * par, d);
		cam.lookAt(0, 0, 0);
		cam.setViewOffset(
			size.width,
			size.height,
			-cur.fx * size.width,
			cur.fy * size.height,
			size.width,
			size.height,
		);
		cam.far = d + 400;
		cam.updateProjectionMatrix();
		// Intro: fade the whole globe system in.
		if (tilt.current) tilt.current.scale.setScalar(0.92 + 0.08 * smoothstep(0, 1, clamp01(live.intro * 1.4)));
	}, -1);

	return (
		<group ref={tilt}>
			<group ref={yawGroup}>
				<group ref={earth}>
					<Earth />
					<Venue />
					<Arcs />
				</group>
				<Orbits />
			</group>
		</group>
	);
}

export default function SpaceScene({ lowPower }: { lowPower: boolean }) {
	return (
		<Canvas
			legacy
			linear
			flat
			dpr={[1, lowPower ? 1.5 : 1.75]}
			gl={{ antialias: !lowPower, alpha: false, powerPreference: "high-performance" }}
			camera={{ fov: 35, near: 0.05, far: 600, position: [0, 0, 6] }}
			style={{ position: "absolute", inset: 0 }}
			onCreated={({ gl }) => gl.setClearColor(0x02040b, 1)}
		>
			<Backdrop />
			<Starfield count={lowPower ? 1400 : 2600} />
			<World />
		</Canvas>
	);
}
