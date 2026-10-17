import { useEffect } from "react";
import { scene, setSceneValue } from "@/components/space/sceneStore";

declare global {
	interface Window {
		__bootFinish?: () => void;
	}
}

const MIN_MS = 1500;
const MAX_MS = 7000;

/**
 * Drives the first-visit loader that ships as static markup in index.html:
 * waits for fonts and the first WebGL frames, then opens it like an iris.
 */
export default function BootLoader() {
	useEffect(() => {
		const el = document.getElementById("boot");
		if (!el || getComputedStyle(el).display === "none") {
			el?.remove();
			setSceneValue("booted", true);
			return;
		}

		let fontsReady = false;
		document.fonts?.ready.then(() => (fontsReady = true));
		const canWebGL = (() => {
			try {
				return !!document.createElement("canvas").getContext("webgl2");
			} catch {
				return false;
			}
		})();

		let closing = false;
		const timers: ReturnType<typeof setTimeout>[] = [];
		const poll = setInterval(() => {
			const t = performance.now();
			const sceneOk = scene.ready || !canWebGL || t > 4500;
			if (closing || !(t > MAX_MS || (t > MIN_MS && fontsReady && sceneOk))) return;
			closing = true;
			clearInterval(poll);
			window.__bootFinish?.();
			timers.push(
				setTimeout(() => {
					el.classList.add("out");
					setSceneValue("booted", true);
					timers.push(setTimeout(() => el.remove(), 1300));
				}, 420),
			);
		}, 100);

		return () => {
			clearInterval(poll);
			timers.forEach(clearTimeout);
		};
	}, []);

	return null;
}
