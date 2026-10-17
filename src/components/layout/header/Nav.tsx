import { Routes, type Route } from "@/lib/routes";
import { useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { LocalLink, stripLang, useT } from "@/lib/lang";
import Dropdown from "./Dropdown";

export const isActivePath = (pathname: string, path: string) => {
	const p = stripLang(pathname).replace(/\/+$/, "") || "/";
	return path === "/" ? p === "/" : p === path || p.startsWith(path + "/");
};

const Nav = () => {
	const { t } = useT();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [hovered, setHovered] = useState<string | null>(null);

	const pill = (name: string, active: boolean) => (
		<>
			{active && (
				<motion.span
					layoutId="nav-active"
					className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-white/[0.06]"
					transition={{ type: "spring", stiffness: 380, damping: 32 }}
				/>
			)}
			{hovered === name && !active && (
				<motion.span
					layoutId="nav-hover"
					className="absolute inset-0 -z-10 rounded-full bg-white/[0.04]"
					transition={{ type: "spring", stiffness: 420, damping: 36 }}
				/>
			)}
		</>
	);

	const resolveRoute = (route: Route) => {
		if (route.hidden || !route.showInNav) return null;
		const active = isActivePath(pathname, route.path);

		if (route.routes)
			return (
				<li key={route.name} className="relative isolate" onMouseEnter={() => setHovered(route.name)}>
					{pill(route.name, active)}
					<Dropdown title={t(`routes.${route.name}`)} active={active}>
						{Object.values(route.routes).map((r, i) =>
							r.disabled ? (
								<p key={r.name + r.path} className="flex items-center gap-3 px-3 py-2.5 text-nowrap text-dim">
									<span className="font-mono text-[0.65rem]">{String(i + 1).padStart(2, "0")}</span>
									{t(`routes.${r.name}`)}
								</p>
							) : (
								<LocalLink
									to={`${route.path}/${r.path}` as string}
									key={r.name}
									className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 text-nowrap text-muted transition-colors hover:bg-white/[0.05] hover:text-white [&.active]:text-cyan"
								>
									<span className="font-mono text-[0.65rem] text-dim group-hover/item:text-accent">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="flex-1">{t(`routes.${r.name}`)}</span>
									<span className="-translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100">
										→
									</span>
								</LocalLink>
							),
						)}
					</Dropdown>
				</li>
			);

		const cta = route.name === "registration";
		return (
			<li key={route.name} className="relative isolate" onMouseEnter={() => setHovered(route.name)}>
				{!cta && pill(route.name, active)}
				<LocalLink
					to={route.path}
					className={
						cta
							? `ml-2 inline-flex items-center gap-2 rounded-full border px-4 py-2 whitespace-nowrap transition-all ${
									active
										? "border-cyan/60 bg-primary/70 text-white"
										: "border-accent/40 bg-primary/40 text-white hover:border-cyan/70 hover:bg-primary/70 hover:shadow-[0_0_30px_-6px_rgb(94_240_255_/_0.6)]"
								}`
							: `block px-3 py-2 whitespace-nowrap transition-colors ${active ? "text-white" : "text-muted hover:text-white"}`
					}
				>
					{cta && <span className="size-1.5 animate-pulse rounded-full bg-cyan" />}
					{t(`routes.${route.name}`)}
				</LocalLink>
			</li>
		);
	};

	return (
		<nav aria-label="Main" className="hidden xl:block">
			<ul className="flex items-center text-sm" onMouseLeave={() => setHovered(null)}>
				{Object.values(Routes).map((v) => resolveRoute(v))}
			</ul>
		</nav>
	);
};

export default Nav;
