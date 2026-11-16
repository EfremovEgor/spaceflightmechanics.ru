import Accordion from "@/components/common/Accordion";
import ExternalLink from "@/components/common/ExternalLink";
import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { PROGRAM_PLACE, roundtableMeetings, ZOOM_REGISTRATION } from "@/lib/program";
import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/lang";

export const Route = createFileRoute(
  "/sessions-and-highlights/roundtable-meetings",
)({
  component: RouteComponent,
  head: () =>
    pageHead(
      Routes.sessions_and_highlights.routes!.roundtable_meetings,
      `${Routes.sessions_and_highlights.path}/${Routes.sessions_and_highlights.routes!.roundtable_meetings.path}`,
    ),
});

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.roundtable")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-4">
        {roundtableMeetings.map((r) => (
          <Reveal key={r.number}>
            <article id={`roundtable-${r.number}`} className="panel hud-corners flex scroll-mt-28 flex-col gap-5 p-6 sm:p-8">
              <div className="flex flex-col gap-3">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
                  <span className="text-accent">{t("sessions.roundtableN", { n: r.number })}</span>
                  <span className="text-cyan">
                    {r.date} · {r.time}
                  </span>
                  <span className="text-dim">{PROGRAM_PLACE}</span>
                </p>
                <h2 className="font-display text-lg leading-snug text-white sm:text-xl">{r.title}</h2>
                <p className="text-sm text-muted">
                  {t("sessions.timeZone")} ·{" "}
                  <ExternalLink to={ZOOM_REGISTRATION}>{t("sessions.zoom")}</ExternalLink>
                </p>
              </div>
              <div className="text-muted">
                <strong className="text-white">{t("sessions.moderator")}</strong>
                <br />
                {r.moderator.name}, {r.moderator.affiliation}
              </div>
              <Accordion
                items={[
                  {
                    title: t("sessions.participants"),
                    content: (
                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        {r.participants.map((p) => (
                          <p key={p.name} className="text-muted">
                            <span className="text-white">{p.name}</span>
                            <br />
                            {p.affiliation}
                          </p>
                        ))}
                      </div>
                    ),
                  },
                  {
                    title: t("sessions.description"),
                    content: <p className="text-justify text-sm leading-relaxed text-muted">{r.description}</p>,
                  },
                ]}
              />
            </article>
          </Reveal>
        ))}
      </div>
    </BasePageLayout>
  );
}
