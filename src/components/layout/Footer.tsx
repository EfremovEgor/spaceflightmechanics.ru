import Container from "@/components/layout/Container";
import { Logos } from "@/components/layout/header/Header";
import { Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { LocalLink, useT } from "@/lib/lang";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Trans } from "react-i18next";

const Footer = () => {
	const { t } = useT();
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
	const y = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

	const links = Object.values(Routes).filter((r) => !r.hidden && r.showInNav);

	return (
		<footer ref={ref} className="relative z-10 mt-auto overflow-hidden border-t border-line">
			<motion.div
				aria-hidden
				className="absolute inset-0 bg-[url('/images/footer.webp')] bg-cover bg-[center_30%]"
				style={{ y, scale }}
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-gradient-to-b from-space-950 via-space-950/80 to-space-950/40"
			/>

			<Container className="relative grid gap-12 pt-20 pb-12 md:grid-cols-12">
				<div className="md:col-span-5">
					<Logos size="lg" />
					<p className="mt-8 max-w-sm font-display text-lg leading-snug text-white">
						<Trans t={t} i18nKey="forum.full" />
					</p>
					<p className="mt-4 font-mono text-xs tracking-widest text-muted uppercase">
						<span className="text-flare">{t("forum.dates")}</span>
						<br />
						{t("forum.venue")}
					</p>
				</div>

				<nav aria-label="Footer" className="md:col-span-3">
					<ul className="grid gap-2.5 text-muted">
						{links.map((r) =>
							r.routes ? (
								Object.values(r.routes)
									.filter((s) => !s.disabled)
									.map((s) => (
										<li key={s.name}>
											<LocalLink
												to={`${r.path}/${s.path}` as string}
												className="transition-colors hover:text-white"
											>
												{t(`routes.${s.name}`)}
											</LocalLink>
										</li>
									))
							) : (
								<li key={r.name}>
									<LocalLink to={r.path} className="transition-colors hover:text-white">
										{t(`routes.${r.name}`)}
									</LocalLink>
								</li>
							),
						)}
					</ul>
				</nav>

				<div className="text-sm leading-relaxed text-muted md:col-span-4">
					<p>
						<strong className="text-white">{t("common.locLabel")}</strong>
						<br />
						<a className="link" href="tel:+79197727658">
							+79197727658
						</a>
						<br />
						<a className="link" href="mailto:orgcom@spacescitech.com">
							orgcom@spacescitech.com
						</a>
					</p>
					<p className="mt-5">
						<strong className="text-white">{t("common.venueAddress")}</strong>
						<br />
						{t("common.addressInline")}
					</p>
				</div>
			</Container>

			<Container className="relative flex items-center justify-between gap-4 border-t border-line py-6 font-mono text-[0.7rem] tracking-widest text-dim uppercase">
				<span>© 2026 · SciTech Forum</span>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label={t("common.backToTop")}
					className="group flex size-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-cyan/60 hover:text-white"
				>
					<Icon icon="mdi:rocket-launch-outline" className="text-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-45" />
				</button>
			</Container>
		</footer>
	);
};

export default Footer;
