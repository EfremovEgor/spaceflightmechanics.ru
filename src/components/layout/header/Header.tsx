import Container from "@/components/layout/Container";
import { useRouterState } from "@tanstack/react-router";
import { Trans } from "react-i18next";
import { LangSwitch, LocalLink, useT } from "@/lib/lang";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import NavDropdown from "./NavDropdown";

/** Both organizer logos at one height so their emblems match. */
export const Logos = ({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) => {
	const { t } = useT();
	const h = size === "lg" ? "h-9 sm:h-10" : "h-7 sm:h-8";
	return (
		<span className={`flex shrink-0 items-center gap-3 sm:gap-4 ${className}`}>
			<img className={`${h} w-auto`} src="/images/ras-logo.webp" width={533} height={128} alt={t("forum.organizers")} />
			<span className="h-6 w-px shrink-0 bg-line-strong" />
			<img className={`${h} w-auto`} src="/images/rudn-logo.webp" width={430} height={128} alt={t("forum.rudn")} />
		</span>
	);
};

const Header = () => {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { t } = useT();

	useEffect(() => setMenuOpen(false), [pathname]);

	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setScrolled(y > 24);
		setHidden(y > prev && y > 480);
	});

	return (
		<motion.header
			className="fixed inset-x-0 top-0 z-50"
			animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
			transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
		>
			<div
				className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
					scrolled || menuOpen
						? "border-line bg-space-950/70 backdrop-blur-xl"
						: "border-transparent bg-transparent"
				}`}
			>
				<Container className="flex h-[68px] items-center justify-between gap-6 sm:h-[76px]">
					<LocalLink to="/" className="group flex items-center gap-4" aria-label={`${t("forum.shortPlain")} — ${t("routes.home")}`}>
						<Logos />
						<span className="hidden font-display text-[0.7rem] leading-tight tracking-wide whitespace-nowrap text-muted transition-colors group-hover:text-white 2xl:block">
							<Trans t={t} i18nKey="forum.short" />
						</span>
					</LocalLink>
					<Nav />
					<div className="flex items-center gap-3">
						<LangSwitch className="hidden sm:flex" />
						<NavDropdown open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
					</div>
				</Container>
			</div>
		</motion.header>
	);
};

export default Header;
