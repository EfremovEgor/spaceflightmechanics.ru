import { ButtonLink } from "@/components/common/Button";
import Countdown from "@/components/common/Countdown";
import ExternalLink from "@/components/common/ExternalLink";
import Marquee from "@/components/common/Marquee";
import { EASE, Magnetic, Reveal, SpotlightCard, SplitWords, Stagger, useBooted } from "@/components/common/motion";
import OrbitLegend from "@/components/home/OrbitLegend";
import Telemetry from "@/components/home/Telemetry";
import Timeline from "@/components/home/Timeline";
import Container from "@/components/layout/Container";
import { pageHead, Routes } from "@/lib/routes";
import { TechnicalSessions } from "@/lib/sessions";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Trans } from "react-i18next";
import { LocalLink, useT } from "@/lib/lang";

export const Route = createFileRoute("/")({
	component: App,
	head: () => pageHead(Routes.home),
});

const TOPIC_ICONS: Record<string, string> = {
	"Space Flight Mechanics": "mdi:orbit",
	"Deep Space Exploration": "mdi:telescope",
	"Earth Observations": "mdi:earth",
	"Space Sensors & Actuators": "mdi:radar",
	"Space Materials & Structures": "mdi:cube-scan",
	"Space Architecture": "mdi:space-station",
	"AIML In Space Applications": "mdi:brain",
	"Space Power & Propulsion": "mdi:rocket-launch",
	"Space Policy, Law & Economics": "mdi:scale-balance",
};

function Hero() {
	const booted = useBooted();
	const { t } = useT();
	const appear = (delay: number) => ({
		initial: { opacity: 0, y: 24, filter: "blur(8px)" },
		animate: booted ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
		transition: { duration: 1, ease: EASE, delay },
	});

	return (
		<section data-stage className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-10 lg:justify-center lg:pb-24">
			<Telemetry className="absolute top-28 right-8 hidden xl:block" />

			<Container className="relative">
				<div data-stage-pass className="max-w-[720px]">
					<motion.div className="flex flex-wrap items-center gap-2" {...appear(0.05)}>
						<span className="chip border-flare/40 text-flare">
							<span className="size-1.5 rounded-full bg-flare" />
							{t("forum.dates")}
						</span>
						<span className="chip">{t("forum.venue")}</span>
					</motion.div>

					<h1 className="mt-6 font-display font-medium tracking-tight text-white sm:mt-8">
						<motion.span className="block text-[2.7rem] leading-[1.02] sm:text-7xl xl:text-[5.4rem]" {...appear(0.15)}>
							<Trans t={t} i18nKey="forum.short" components={{ sup: <sup className="text-[0.45em]" /> }} />
						</motion.span>
						<span className="text-gradient mt-3 block text-xl leading-snug font-light sm:mt-4 sm:text-3xl xl:text-[2.4rem]">
							<SplitWords key={t("forum.tagline")} text={t("forum.tagline")} delay={0.35} stagger={0.05} />
						</span>
					</h1>

					<motion.div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4" {...appear(0.7)}>
						<Magnetic>
							<ButtonLink to="/abstract-submission/">{t("common.submitNow")}</ButtonLink>
						</Magnetic>
						<Magnetic>
							<ButtonLink to="/registration/" variant="ghost">
								{t("common.registerNow")}
							</ButtonLink>
						</Magnetic>
					</motion.div>

					<motion.div className="mt-10 sm:mt-14" {...appear(0.9)}>
						<Countdown />
					</motion.div>
				</div>
			</Container>

			<motion.div
				className="absolute right-8 bottom-10 hidden md:block"
				initial={{ opacity: 0, x: 20 }}
				animate={booted ? { opacity: 1, x: 0 } : undefined}
				transition={{ duration: 1, ease: EASE, delay: 1.4 }}
			>
				<OrbitLegend />
				<p className="mt-3 flex items-center gap-2 px-2.5 font-mono text-[0.62rem] tracking-[0.18em] text-dim uppercase">
					<Icon icon="mdi:rotate-3d-variant" className="text-sm" />
					{t("common.dragHint")}
				</p>
			</motion.div>

			<motion.a
				href="#about"
				aria-label={t("home.About")}
				className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-dim transition-colors hover:text-white lg:flex"
				initial={{ opacity: 0 }}
				animate={booted ? { opacity: 1 } : undefined}
				transition={{ delay: 1.8, duration: 1 }}
			>
				<span className="relative h-10 w-6 rounded-full border border-line-strong">
					<motion.span
						className="absolute top-2 left-1/2 h-2 w-0.5 -translate-x-1/2 rounded bg-cyan"
						animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					/>
				</span>
			</motion.a>
		</section>
	);
}

function App() {
	const { t } = useT();
	const topic = (name: string) => t(`topics.${name}`, { defaultValue: name });
	const rich = {
		b: <strong className="text-white" />,
		hl: <span className="text-flare" />,
		phone: <a className="link" href="tel:+79197727658" />,
		mail: <a className="link" href="mailto:orgcom@spacescitech.com" />,
		submission: <LocalLink className="link" to="/abstract-submission/" />,
		registration: <LocalLink className="link" to="/registration/" />,
	};

	return (
		<>
			<Hero />

			<div className="relative z-10 border-y border-line bg-space-950/60 py-5 font-display text-sm tracking-wide text-muted backdrop-blur-sm sm:text-base">
				<Marquee items={TechnicalSessions.map((s) => topic(s.name))} />
			</div>

			<section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
				<Container>
					<Reveal className="flex items-end justify-between gap-6">
						<div>
							<p className="eyebrow flex items-center gap-2">
								<span className="h-px w-8 bg-accent" />
								01
							</p>
							<h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
								{t("home.About")}
							</h2>
						</div>
					</Reveal>

					<div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
						<Reveal className="lg:col-span-7">
							<SpotlightCard className="h-full p-6 sm:p-10" tilt={false}>
								<p className="relative text-xl leading-relaxed text-ink sm:text-2xl">
									<Trans t={t} i18nKey="home.intro" components={rich} />
								</p>
								<div className="relative mt-8 border-t border-line pt-6 leading-relaxed text-muted">
									<p>
										<Trans t={t} i18nKey="home.organized" components={rich} />
									</p>
								</div>
							</SpotlightCard>
						</Reveal>

						<Reveal className="lg:col-span-5 lg:row-span-2" delay={0.1}>
							<SpotlightCard className="flex h-full flex-col justify-between p-6 sm:p-8">
								<div className="relative -mx-6 -mt-6 mb-2 flex h-64 justify-center overflow-hidden sm:-mx-8 sm:-mt-8 sm:h-80">
									<div
										aria-hidden
										className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(77_163_255/0.35),transparent_70%)]"
									/>
									<img
										src="/images/gagarin.webp"
										alt={t("common.gagarin")}
										width={397}
										height={491}
										loading="lazy"
										className="relative mt-6 h-[115%] w-auto animate-float object-contain object-top opacity-90 drop-shadow-[0_20px_40px_rgb(0_0_0_/_0.6)] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
									/>
								</div>
								<div className="relative space-y-4 leading-relaxed text-muted">
									<p>
										<Trans
											t={t}
											i18nKey="home.venue"
											components={{ ...rich, ext: <ExternalLink to="https://eng.rudn.ru/" /> }}
										/>
									</p>
									<p>
										<Trans t={t} i18nKey="home.languages" components={rich} />
									</p>
								</div>
							</SpotlightCard>
						</Reveal>

						<Reveal className="lg:col-span-7" delay={0.05}>
							<SpotlightCard className="h-full p-6 sm:p-10" tilt={false}>
								<div className="relative flex gap-5">
									<span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-primary/30 text-2xl text-cyan sm:flex">
										<Icon icon="mdi:access-point-network" />
									</span>
									<p className="leading-relaxed text-muted">
										<Trans t={t} i18nKey="home.format" components={rich} />
									</p>
								</div>
							</SpotlightCard>
						</Reveal>
					</div>

					<Reveal className="mt-4 sm:mt-5">
						<Timeline />
					</Reveal>

					<div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-2">
						<Reveal>
							<SpotlightCard className="h-full p-6 sm:p-8" tilt={false}>
								<Icon icon="mdi:file-document-check-outline" className="relative text-3xl text-accent" />
								<p className="relative mt-5 leading-relaxed text-muted">
									{t("home.selection")}
								</p>
							</SpotlightCard>
						</Reveal>
						<Reveal delay={0.1}>
							<SpotlightCard className="h-full p-6 sm:p-8" tilt={false}>
								<Icon icon="mdi:book-open-page-variant-outline" className="relative text-3xl text-violet" />
								<p className="relative mt-5 leading-relaxed text-muted">
									<Trans
										t={t}
										i18nKey="home.publication"
										components={{ ext: <ExternalLink to="https://www.sciencedirect.com/journal/acta-astronautica" /> }}
									/>
								</p>
							</SpotlightCard>
						</Reveal>
					</div>
				</Container>
			</section>

			<section className="relative py-20 sm:py-28">
				<Container>
					<Reveal>
						<p className="eyebrow flex items-center gap-2">
							<span className="h-px w-8 bg-accent" />
							02
						</p>
						<h2 className="mt-4 max-w-3xl font-display text-2xl leading-tight font-medium tracking-tight text-white sm:text-4xl">
							{t("home.topicsTitle")}
						</h2>
					</Reveal>

					<ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
						{TechnicalSessions.map((s, i) => (
							<Reveal as="li" key={s.name} delay={(i % 4) * 0.07}>
								<SpotlightCard className="flex h-full min-h-[150px] flex-col justify-between gap-6 p-5 sm:min-h-[190px] sm:p-6">
									<div className="relative flex items-start justify-between">
										<span className="flex size-11 items-center justify-center rounded-xl border border-line-strong bg-space-800/80 text-2xl text-cyan transition-all duration-500 group-hover:scale-110 group-hover:border-cyan/50 group-hover:shadow-[0_0_24px_-4px_rgb(94_240_255_/_0.6)]">
											<Icon icon={TOPIC_ICONS[s.name] ?? "mdi:star-four-points"} />
										</span>
										<span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
									</div>
									<span className="relative font-display text-[0.95rem] leading-snug text-white">{topic(s.name)}</span>
								</SpotlightCard>
							</Reveal>
						))}
					</ul>

					<Reveal className="mt-4 sm:mt-5">
						<SpotlightCard className="p-6 sm:p-10" tilt={false}>
							<div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
								<Stagger className="flex shrink-0 gap-3 text-2xl text-flare" gap={0.1}>
									{["mdi:silverware-fork-knife", "mdi:bed-outline", "mdi:bus-side", "mdi:coffee-outline"].map((ic) => (
										<span
											key={ic}
											className="flex size-12 items-center justify-center rounded-2xl border border-flare/25 bg-flare/10"
										>
											<Icon icon={ic} />
										</span>
									))}
								</Stagger>
								<p className="leading-relaxed text-muted">
									{t("home.support")}
								</p>
							</div>
						</SpotlightCard>
					</Reveal>
				</Container>
			</section>
		</>
	);
}
