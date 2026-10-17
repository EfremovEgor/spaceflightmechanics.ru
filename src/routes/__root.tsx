import "@/lib/icons";
import BootLoader from "@/components/BootLoader";
import { ButtonLink } from "@/components/common/Button";
import ScrollProgress from "@/components/common/ScrollProgress";
import BasePageLayout from "@/components/layout/BasePageLayout";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import SpaceBackground from "@/components/space/SpaceBackground";
import { Routes, siteHead } from "@/lib/routes";
import { HeadContent, Outlet, createRootRoute, redirect, useRouterState } from "@tanstack/react-router";
import { RU_ENABLED } from "@/i18n";
import { langFromPath, stripLang } from "@/lib/lang";
import { MotionConfig, motion } from "motion/react";
import { useEffect } from "react";
import { useT } from "@/lib/lang";

export const Route = createRootRoute({
	// While the Russian version is off, /ru/... opens the same page in English.
	beforeLoad: ({ location }) => {
		if (!RU_ENABLED && langFromPath(location.pathname) === "ru") {
			throw redirect({ to: stripLang(location.pathname) as "/", replace: true });
		}
	},
	head: () => siteHead,
	notFoundComponent: NotFound,
	component: RootComponent,
});

function NotFound() {
	const { t } = useT();
	return (
		<BasePageLayout name={t("notFound.title")}>
			<div className="flex flex-col items-start gap-8">
				<p className="text-lg text-muted">{t("notFound.text")}</p>
				<ButtonLink to={Routes.home.path} variant="ghost" icon="mdi:arrow-left">
					{t(`routes.${Routes.home.name}`)}
				</ButtonLink>
			</div>
		</BasePageLayout>
	);
}

function RootComponent() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { t, lang } = useT();

	useEffect(() => {
		document.documentElement.classList.remove("ssr-mismatch");
	}, []);
	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	return (
		<MotionConfig reducedMotion="user">
			{/* Head tags for prerendered pages are written by scripts/prerender.mjs. */}
			{!import.meta.env.SSR && <HeadContent />}
			<a
				href="#main"
				className="sr-only z-[80] rounded-full bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
			>
				{t("common.skip")}
			</a>
			<BootLoader />
			<SpaceBackground />
			<ScrollProgress />
			<div className="relative flex min-h-svh flex-col">
				<Header />
				<main id="main" className="relative z-10 flex-1">
					<motion.div
						key={pathname}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<Outlet />
					</motion.div>
				</main>
				<Footer />
			</div>
		</MotionConfig>
	);
}
