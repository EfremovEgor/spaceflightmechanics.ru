import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import ProgramInfo from "@/components/sessions/ProgramInfo";
import {
  technicalSessions,
  technicalTopics,
  type TechnicalSession,
  type TechnicalSessionChair,
} from "@/lib/technicalSessions";
import { pageHead, Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
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

const sessionByNumber = new Map(technicalSessions.map((s) => [s.number, s]));

// "Wednesday, November 25" -> "Wed, November 25", as on the booklet's session rows.
const shortDate = (date: string) => date.replace(/^(\w{3})\w*,/, "$1,");

const sameChairs = (a: TechnicalSessionChair[], b: TechnicalSessionChair[]) =>
  a.length === b.length && a.every((c, i) => c.name === b[i].name);

function Chairs({ chairs }: { chairs: TechnicalSessionChair[] }) {
  const { t } = useT();
  return (
    <ul className="grid gap-3 text-sm sm:grid-cols-2 sm:gap-6">
      {chairs.map((c) => (
        <li key={c.name}>
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-accent uppercase">{t("sessions.chair")}</span>{" "}
          <span className="font-semibold text-white">{c.name}</span>
          <br />
          <span className="text-muted">{c.affiliation}</span>
        </li>
      ))}
    </ul>
  );
}

/** One session row of a topic card; opens to the session's papers. */
function SessionRow({ session, topicChairs }: { session: TechnicalSession; topicChairs: TechnicalSessionChair[] }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div id={`session-${session.number}`} className="scroll-mt-28">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="group flex w-full flex-wrap items-center gap-2 py-3 text-left font-mono text-[0.68rem] tracking-[0.12em] uppercase"
      >
        <span className="rounded-md bg-accent px-2.5 py-1 font-semibold text-space-950">TS {session.number}</span>
        <span className="chip text-cyan">{shortDate(session.date)}</span>
        <span className="chip text-cyan">{session.time}</span>
        <span className="chip">{session.hall}</span>
        <span className="ml-auto flex items-center gap-1 text-accent transition-colors group-hover:text-cyan">
          {t("sessions.papers", { count: session.papers.length })}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex">
            <Icon icon="mdi:chevron-down" className="text-lg" />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-3 rounded-xl border border-line bg-white/[0.03] px-4 py-3 sm:px-5">
              <p className="font-display text-base leading-snug text-white">
                {session.title} <span className="text-dim">({session.code})</span>
              </p>
              {!sameChairs(session.chairs, topicChairs) && (
                <div className="mt-3">
                  <Chairs chairs={session.chairs} />
                </div>
              )}
              <ol className="mt-2 flex flex-col divide-y divide-line">
                {session.papers.map((p, i) => (
                  <li key={p.id} className="grid gap-x-5 gap-y-1 py-3 sm:grid-cols-[7.5rem_1fr]">
                    <p className="flex gap-3 font-mono text-xs tracking-wider sm:flex-col sm:gap-0.5">
                      <span className="text-white">{p.time}</span>
                      <span className="text-cyan">{p.id}</span>
                    </p>
                    <div>
                      <p className="leading-snug font-semibold text-white">
                        <span className="mr-1.5 font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                        {p.title}
                      </p>
                      <div className="mt-1 text-sm text-muted">
                        {p.authors.map((a) => (
                          <p key={a}>{a}</p>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.technical")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-6">
        <ProgramInfo hidePlace />
        {technicalTopics.map((topic) => (
          <Reveal key={topic.code}>
            <article className="panel hud-corners flex flex-col gap-4 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="font-display text-lg leading-snug text-white sm:text-xl">
                  {topic.title} <span className="text-dim">({topic.code})</span>
                </h2>
                {topic.sessions.length > 1 && (
                  <span className="chip shrink-0">{t("sessions.sessionsN", { count: topic.sessions.length })}</span>
                )}
              </div>
              <Chairs chairs={topic.chairs} />
              <p className="text-justify text-sm leading-relaxed text-muted">{topic.description}</p>
              <div className="flex flex-col divide-y divide-dashed divide-line border-t border-line">
                {topic.sessions.map((n) => {
                  const session = sessionByNumber.get(n);
                  return session && <SessionRow key={n} session={session} topicChairs={topic.chairs} />;
                })}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </BasePageLayout>
  );
}
