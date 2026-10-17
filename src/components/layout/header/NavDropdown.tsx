import Container from "@/components/layout/Container";
import { Routes } from "@/lib/routes";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { LangSwitch, LocalLink, useT } from "@/lib/lang";
import { isActivePath } from "./Nav";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Mobile navigation: burger button and a full-screen menu. */
const NavDropdown = ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
	const { t } = useT();
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onToggle();
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onToggle]);

	const items = Object.values(Routes).filter((r) => !r.hidden && r.showInNav);
	let n = 0;

	const menu = (
		<AnimatePresence>
			{open && (
				<motion.div
					id="mobile-menu"
					className="fixed inset-0 z-40 overflow-y-auto bg-space-950/95 pt-[84px] backdrop-blur-xl xl:hidden"
					initial={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
					animate={{ clipPath: "circle(150% at calc(100% - 40px) 38px)" }}
					exit={{ clipPath: "circle(0% at calc(100% - 40px) 38px)" }}
					transition={{ duration: 0.7, ease: EASE }}
				>
					<div
						aria-hidden
						className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full border border-line"
					/>
					<div
						aria-hidden
						className="pointer-events-none absolute -top-20 -right-20 size-[340px] animate-spin-slow rounded-full border border-dashed border-accent/20"
					/>
					<Container className="relative flex min-h-full flex-col pb-10">
						<nav aria-label="Mobile">
							<ul className="flex flex-col">
								{items.map((r) => {
									const idx = ++n;
									const active = isActivePath(pathname, r.path);
									return (
										<motion.li
											key={r.name}
											className="border-b border-line"
											initial={{ opacity: 0, y: 30 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.6, ease: EASE, delay: 0.12 + idx * 0.05 }}
										>
											{r.routes ? (
												<div className="py-4">
													<span className="flex items-baseline gap-4 font-display text-2xl text-white">
														<span className="font-mono text-xs text-accent">{String(idx).padStart(2, "0")}</span>
														{t(`routes.${r.name}`)}
													</span>
													<div className="mt-3 ml-9 flex flex-col gap-1">
														{Object.values(r.routes).map((s) =>
															s.disabled ? (
																<p key={s.name} className="py-1.5 text-dim">
																	{t(`routes.${s.name}`)}
																</p>
															) : (
																<LocalLink
																	key={s.name}
																	onClick={onToggle}
																	to={`${r.path}/${s.path}` as string}
																	className="py-1.5 text-lg text-muted transition-colors hover:text-white [&.active]:text-cyan"
																>
																	{t(`routes.${s.name}`)}
																</LocalLink>
															),
														)}
													</div>
												</div>
											) : (
												<LocalLink
													onClick={onToggle}
													to={r.path}
													className={`flex items-baseline gap-4 py-4 font-display text-2xl transition-colors ${
														active ? "text-cyan" : "text-white hover:text-cyan"
													}`}
												>
													<span className="font-mono text-xs text-accent">{String(idx).padStart(2, "0")}</span>
													{t(`routes.${r.name}`)}
												</LocalLink>
											)}
										</motion.li>
									);
								})}
							</ul>
						</nav>
						<motion.div
							className="mt-auto pt-10 font-mono text-xs leading-relaxed tracking-wider text-muted uppercase"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.6 }}
						>
							<LangSwitch className="mb-6 w-fit sm:hidden" />
							<p className="text-flare">{t("forum.dates")}</p>
							<p>{t("forum.venue")}</p>
							<a className="mt-3 block normal-case text-accent" href="mailto:orgcom@spacescitech.com">
								orgcom@spacescitech.com
							</a>
						</motion.div>
					</Container>
				</motion.div>
			)}
		</AnimatePresence>
	);

	return (
		<div className="xl:hidden">
			<button
				onClick={onToggle}
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
				className="relative z-50 flex size-11 items-center justify-center rounded-full border border-line-strong bg-space-900/60 backdrop-blur transition-colors hover:border-cyan/60"
			>
				<span className="relative block h-3 w-5" aria-hidden>
					<span
						className={`absolute top-0 left-0 block h-[1.5px] w-5 rounded bg-white transition-transform duration-300 ${
							open ? "translate-y-[5.25px] rotate-45" : ""
						}`}
					/>
					<span
						className={`absolute bottom-0 left-0 block h-[1.5px] rounded bg-white transition-all duration-300 ${
							open ? "w-5 -translate-y-[5.25px] -rotate-45" : "w-3.5"
						}`}
					/>
				</span>
			</button>
			{typeof document !== "undefined" && createPortal(menu, document.body)}
		</div>
	);
};

export default NavDropdown;
