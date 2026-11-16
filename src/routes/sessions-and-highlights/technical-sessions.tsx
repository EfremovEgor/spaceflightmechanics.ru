import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import ProgramInfo from "@/components/sessions/ProgramInfo";
import { technicalSessions } from "@/lib/technicalSessions";
import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/lang";

export const Route = createFileRoute(
  "/sessions-and-highlights/technical-sessions",
)({
  component: RouteComponent,
  head: () =>
    pageHead(
      Routes.sessions_and_highlights.routes!.technical_sessions,
      `${Routes.sessions_and_highlights.path}/${Routes.sessions_and_highlights.routes!.technical_sessions.path}`,
    ),
});

const groups = [...new Set(technicalSessions.map((s) => s.group))];

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.technical")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-12">
        <ProgramInfo breakoutRooms />
        {groups.map((group) => (
          <div key={group}>
            <h2 className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              {group}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {technicalSessions
                .filter((s) => s.group === group)
                .map((s) => (
                  <Reveal key={s.number}>
                    <article id={`session-${s.number}`} className="panel hud-corners flex scroll-mt-28 flex-col gap-4 p-5 sm:p-7">
                      <div className="flex flex-col gap-2">
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
                          <span className="text-accent">
                            {t("sessions.technicalN", { n: s.number })} · {s.code}
                          </span>
                          <span className="text-cyan">{s.time}</span>
                          <span className="text-dim">{s.hall}</span>
                        </p>
                        <h3 className="font-display text-lg leading-snug text-white sm:text-xl">{s.title}</h3>
                      </div>
                      <div className="text-sm text-muted">
                        <strong className="text-white">{t("sessions.chairs")}</strong>
                        <ul className="mt-1 grid gap-1 sm:grid-cols-2 sm:gap-4">
                          {s.chairs.map((c) => (
                            <li key={c.name}>
                              <span className="text-white">{c.name}</span>
                              <br />
                              {c.affiliation}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-justify text-sm leading-relaxed text-muted">{s.description}</p>
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
