import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import ProgramInfo from "@/components/sessions/ProgramInfo";
import { program, type PlenaryEntry, type SessionEntry } from "@/lib/program";
import { pageHead, Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";
import { LocalLink, useT } from "@/lib/lang";

export const Route = createFileRoute("/sessions-and-highlights/program")({
  component: RouteComponent,
  head: () =>
    pageHead(
      Routes.sessions_and_highlights.routes!.program,
      `${Routes.sessions_and_highlights.path}/${Routes.sessions_and_highlights.routes!.program.path}`,
    ),
});

const Time = ({ children }: { children: string }) => (
  <span className="font-mono text-xs tracking-wider whitespace-nowrap text-cyan sm:pt-0.5">{children}</span>
);

function Entry({ item }: { item: SessionEntry }) {
  const { t } = useT();
  return (
    <li className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <Time>{item.time}</Time>
      <div className="leading-relaxed">
        {item.kind === "item" && <p className="text-white">{item.title}</p>}
        {item.kind === "ceremony" && (
          <>
            <p className="text-white">{item.title}:</p>
            <ul className="mt-2 grid gap-1 text-sm text-muted">
              {item.speakers.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-dim">–</span>
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}
        {item.kind === "lecture" && (
          <>
            <LocalLink
              to="/sessions-and-highlights/highlight-lectures"
              hash={`lecture-${item.number}`}
              className="font-mono text-xs tracking-widest text-flare uppercase hover:text-white"
            >
              {t("sessions.highlightN", { n: item.number })}
            </LocalLink>
            <p className="mt-1 text-white">{item.title}</p>
            <p className="text-sm text-muted">{item.speaker}</p>
          </>
        )}
        {item.kind === "roundtable" && (
          <>
            <LocalLink
              to="/sessions-and-highlights/roundtable-meetings"
              hash={`roundtable-${item.number}`}
              className="font-mono text-xs tracking-widest text-accent uppercase hover:text-white"
            >
              {t("sessions.roundtableN", { n: item.number })}
            </LocalLink>
            <p className="mt-1 text-white">{item.title}</p>
            <p className="text-sm text-muted">
              {t("sessions.moderator")} {item.moderator}
            </p>
          </>
        )}
      </div>
    </li>
  );
}

function Plenary({ session }: { session: PlenaryEntry }) {
  const { t } = useT();
  return (
    <section className="panel hud-corners p-5 sm:p-7">
      <h3 className="font-display text-lg text-white sm:text-xl">{session.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {t("sessions.moderator")} {session.moderator}
      </p>
      <ul className="mt-2 divide-y divide-line">
        {session.items.map((i) => (
          <Entry key={i.time + i.title} item={i} />
        ))}
      </ul>
    </section>
  );
}

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.program")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-12">
        <ProgramInfo />
        {program.map((day) => (
          <Reveal key={day.date}>
            <h2 className="eyebrow flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              {day.date}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {day.items.map((item) =>
                item.kind === "plenary" ? (
                  <Plenary key={item.title} session={item} />
                ) : (
                  <ul key={item.time + item.title} className="panel px-5 sm:px-7">
                    <Entry item={item} />
                  </ul>
                ),
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </BasePageLayout>
  );
}
