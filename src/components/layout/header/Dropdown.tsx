import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type PropsWithChildren } from "react";

interface Props {
	title: string;
	active?: boolean;
}

const Dropdown = ({ title, active = false, children }: PropsWithChildren<Props>) => {
	const [open, setOpen] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	const handleEnter = () => {
		clearTimeout(timeout.current);
		setOpen(true);
	};
	const handleLeave = () => {
		timeout.current = setTimeout(() => setOpen(false), 150);
	};

	return (
		<div
			className="relative"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onFocus={handleEnter}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget as Node)) handleLeave();
			}}
			onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
		>
			<button
				type="button"
				aria-expanded={open}
				aria-haspopup="true"
				onClick={() => setOpen((v) => !v)}
				className={`inline-flex items-center gap-1 px-3 py-2 whitespace-nowrap transition-colors ${
					active || open ? "text-white" : "text-muted hover:text-white"
				}`}
			>
				{title}
				<Icon
					icon="mdi:chevron-down"
					className={`text-lg transition-transform duration-300 ${open ? "rotate-180" : ""}`}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
						className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3"
					>
						<div className="glass hud-corners relative flex min-w-[260px] flex-col gap-0.5 rounded-2xl p-2 shadow-2xl shadow-black/50">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;
