import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	type HTMLMotionProps,
} from "motion/react";
import { Children, useRef, type PointerEvent, type ReactNode } from "react";
import { useSceneValue } from "@/components/space/sceneStore";

/** True once the first-visit loader has opened, so intro animations are not played behind it. */
export const useBooted = () => useSceneValue((s) => s.booted);

export const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
	delay?: number;
	y?: number;
	as?: "div" | "section" | "li" | "article" | "p";
};

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 28, as = "div", children, ...rest }: RevealProps) {
	const Comp = motion[as] as typeof motion.div;
	return (
		<Comp
			initial={{ opacity: 0, y, filter: "blur(8px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "0px 0px -8% 0px" }}
			transition={{ duration: 0.9, ease: EASE, delay }}
			{...rest}
		>
			{children}
		</Comp>
	);
}

/** Staggers the reveal of each direct child. */
export function Stagger({
	children,
	className,
	gap = 0.08,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	gap?: number;
	delay?: number;
}) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, margin: "0px 0px -8% 0px" }}
			transition={{ staggerChildren: gap, delayChildren: delay }}
		>
			{Children.map(children, (child) =>
				child == null ? null : (
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
							shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
						}}
					>
						{child}
					</motion.div>
				),
			)}
		</motion.div>
	);
}

/** Splits text into words that rise in one after another. */
export function SplitWords({
	text,
	className,
	delay = 0,
	stagger = 0.06,
}: {
	text: string;
	className?: string;
	delay?: number;
	stagger?: number;
}) {
	const words = text.split(" ");
	const booted = useBooted();
	return (
		<span className={className} aria-label={text} role="text">
			{words.map((w, i) => (
				<span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
					<motion.span
						className="inline-block"
						initial={{ y: "110%", rotate: 4 }}
						animate={booted ? { y: "0%", rotate: 0 } : undefined}
						transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
					>
						{w}
						{i < words.length - 1 ? " " : ""}
					</motion.span>
				</span>
			))}
		</span>
	);
}

/** Pulls its child slightly toward the cursor. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
	const ref = useRef<HTMLSpanElement>(null);
	const reduce = useReducedMotion();
	const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
	const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
	const onMove = (e: PointerEvent) => {
		if (reduce || e.pointerType !== "mouse" || !ref.current) return;
		const r = ref.current.getBoundingClientRect();
		x.set((e.clientX - (r.left + r.width / 2)) * strength);
		y.set((e.clientY - (r.top + r.height / 2)) * strength);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	return (
		<motion.span
			ref={ref}
			className="inline-block"
			style={{ x, y }}
			onPointerMove={onMove}
			onPointerLeave={reset}
		>
			{children}
		</motion.span>
	);
}

/** Card with a light that follows the cursor and a gentle 3D tilt. */
export function SpotlightCard({
	children,
	className = "",
	tilt = true,
	...rest
}: HTMLMotionProps<"div"> & { tilt?: boolean }) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const rx = useSpring(0, { stiffness: 160, damping: 18 });
	const ry = useSpring(0, { stiffness: 160, damping: 18 });

	const onMove = (e: PointerEvent<HTMLDivElement>) => {
		const el = ref.current;
		if (!el || e.pointerType !== "mouse") return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		el.style.setProperty("--mx", `${px * 100}%`);
		el.style.setProperty("--my", `${py * 100}%`);
		if (tilt && !reduce) {
			rx.set((0.5 - py) * 6);
			ry.set((px - 0.5) * 8);
		}
	};
	const onLeave = () => {
		rx.set(0);
		ry.set(0);
	};

	return (
		<motion.div
			ref={ref}
			onPointerMove={onMove}
			onPointerLeave={onLeave}
			style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
			className={`group panel hud-corners overflow-hidden ${className}`}
			{...rest}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(94 240 255 / 0.10), transparent 45%)",
				}}
			/>
			{children as ReactNode}
		</motion.div>
	);
}
