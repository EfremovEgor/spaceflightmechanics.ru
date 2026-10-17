import { motion } from "motion/react";
import type { PropsWithChildren, ReactNode } from "react";
import { EASE, SplitWords, useBooted } from "@/components/common/motion";
import Container from "@/components/layout/Container";
import { useT } from "@/lib/lang";
import { Trans } from "react-i18next";

interface Props {
	name: string;
	/** Breadcrumb section shown above the title. */
	section?: string;
	/** Optional element beside the title (desktop) / under it (mobile). */
	aside?: ReactNode;
	contentClassName?: string;
}

const BasePageLayout = ({ name, section, aside, contentClassName = "", children }: PropsWithChildren<Props>) => {
	const booted = useBooted();
	const { t } = useT();
	return (
		<>
			<section data-stage className="relative pt-32 pb-10 sm:pt-44 sm:pb-14">
				<div data-stage-pass className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
					<motion.p
						className="eyebrow flex flex-wrap items-center gap-2"
						initial={{ opacity: 0, x: -12 }}
						animate={booted ? { opacity: 1, x: 0 } : undefined}
						transition={{ duration: 0.8, ease: EASE }}
					>
						<span className="h-px w-8 bg-accent" />
						<span>
							<Trans t={t} i18nKey="forum.short" />
						</span>
						{section && (
							<>
								<span className="text-dim">/</span>
								<span className="text-muted">{section}</span>
							</>
						)}
					</motion.p>
					<h1 className="mt-5 max-w-4xl font-display text-[clamp(1.5rem,7.6vw,2.1rem)] leading-[1.08] font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
						<SplitWords text={name} delay={0.1} />
					</h1>
					{aside}
				</div>
			</section>
			<Container className={`relative pb-24 sm:pb-32 ${contentClassName}`}>{children}</Container>
		</>
	);
};

export default BasePageLayout;
