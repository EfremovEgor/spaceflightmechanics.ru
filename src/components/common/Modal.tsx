import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { blur } from "@/components/common/motion";
import { useT } from "@/lib/lang";

export interface Props extends React.PropsWithChildren {
	children: React.ReactElement;
	name: string;
	open?: boolean;
	onClose?: () => void;
	noCloseButton?: boolean;
}

const Modal = ({ children, name, onClose = () => {}, open = false, noCloseButton = false }: Props) => {
	const { t } = useT();
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onClose]);

	if (typeof document === "undefined") return null;

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-space-950/80 px-3 py-6 lg:backdrop-blur-md sm:items-center sm:p-6"
					onClick={onClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label={name || undefined}
						// The frame never scrolls (its corner marks sit 1px outside it); only the body does,
						// and only when the content is taller than the screen.
						className="panel hud-corners relative flex w-full max-w-[min(48rem,100%)] flex-col sm:max-h-[calc(100svh-3rem)]"
						onClick={(e) => e.stopPropagation()}
						initial={{ opacity: 0, y: 40, scale: 0.96, filter: blur(10) }}
						animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: 24, scale: 0.97, filter: blur(8) }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					>
						<div className="flex shrink-0 items-center justify-between gap-4 rounded-t-[1.25rem] border-b border-line bg-space-900/95 px-5 py-4 sm:px-7">
							<h2 className="min-w-0 font-display text-base text-white sm:text-lg">{name}</h2>
							{!noCloseButton && (
								<button
									type="button"
									onClick={onClose}
									className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-cyan/60 hover:text-white"
								>
									{t("common.close")}
									<Icon icon="material-symbols:close" />
								</button>
							)}
						</div>
						<div className="min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain p-5 sm:p-7">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
};

export default Modal;
