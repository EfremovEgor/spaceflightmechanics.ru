import { motion, useScroll, useSpring } from "motion/react";

/** Thin trajectory line along the top edge showing scroll progress. */
export default function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
	return (
		<motion.div
			aria-hidden
			className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan via-accent to-violet"
			style={{ scaleX }}
		/>
	);
}
