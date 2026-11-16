import Accordion from "@/components/common/Accordion";
import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { highlightLectures, PROGRAM_PLACE } from "@/lib/program";
import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/lang";

export const Route = createFileRoute(
  "/sessions-and-highlights/highlight-lectures",
)({
  component: RouteComponent,
  head: () =>
    pageHead(
      Routes.sessions_and_highlights.routes!.highlight_lectures,
      `${Routes.sessions_and_highlights.path}/${Routes.sessions_and_highlights.routes!.highlight_lectures.path}`,
    ),
});

const days = [...new Set(highlightLectures.map((l) => l.date))];

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.highlight")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-12">
        {days.map((day) => (
          <div key={day}>
            <h2 className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              {day}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {highlightLectures
                .filter((l) => l.date === day)
                .map((l) => (
                  <Reveal key={l.number}>
                    <article id={`lecture-${l.number}`} className="panel hud-corners flex scroll-mt-28 flex-col gap-3 p-5 sm:p-7">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
                        <span className="text-flare">{t("sessions.highlightN", { n: l.number })}</span>
                        <span className="text-cyan">{l.time}</span>
                        <span className="text-dim">{PROGRAM_PLACE}</span>
                      </p>
                      <h3 className="font-display text-lg leading-snug text-white sm:text-xl">{l.title}</h3>
                      <p className="text-muted">{l.speaker}</p>
                      {l.abstract && (
                        <Accordion
                          items={[
                            {
                              title: t("sessions.abstract"),
                              content: <p className="text-justify text-sm leading-relaxed text-muted">{l.abstract}</p>,
                            },
                          ]}
                        />
                      )}
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </div>
    </BasePageLayout>
  );
}
