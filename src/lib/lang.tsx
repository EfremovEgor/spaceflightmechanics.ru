import i18n, { RU_ENABLED, type Lang } from "@/i18n";
import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, type ComponentProps } from "react";

/** Russian pages live under /ru/…; everything else is English. */
export const langFromPath = (pathname: string): Lang =>
	pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";

export const stripLang = (pathname: string) =>
	langFromPath(pathname) === "ru" ? pathname.slice(3) || "/" : pathname;

export const localizePath = (path: string, lang: Lang) => {
	const base = stripLang(path);
	if (lang === "en") return base;
	return base === "/" ? "/ru/" : `/ru${base}`;
};

export const useLang = () => useRouterState({ select: (s) => langFromPath(s.location.pathname) });

/** Translator bound to the language of the current URL (no global language switching). */
export function useT() {
	const lang = useLang();
	const t = useMemo(() => i18n.getFixedT(lang), [lang]);
	return { t, lang, lp: (path: string) => localizePath(path, lang) };
}

type LinkProps = Omit<ComponentProps<typeof Link>, "to"> & { to: string };

/** Router link that keeps the reader in their language. */
export function LocalLink({ to, ...rest }: LinkProps) {
	const { lp } = useT();
	return <Link {...(rest as ComponentProps<typeof Link>)} to={lp(to) as "/"} />;
}

/** EN / RU switch that keeps the current page. */
export function LangSwitch({ className = "" }: { className?: string }) {
	const { t, lang } = useT();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (!RU_ENABLED) return null;
	return (
		<div
			role="group"
			aria-label={t("common.language")}
			className={`flex items-center rounded-full border border-line-strong bg-space-900/60 p-0.5 font-mono text-[0.7rem] tracking-[0.14em] backdrop-blur ${className}`}
		>
			{(["en", "ru"] as const).map((l) => (
				<Link
					key={l}
					to={localizePath(pathname, l) as "/"}
					hrefLang={l}
					lang={l}
					aria-current={l === lang ? "true" : undefined}
					className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
						l === lang ? "bg-white/10 text-white" : "text-muted hover:text-white"
					}`}
				>
					{l}
				</Link>
			))}
		</div>
	);
}
