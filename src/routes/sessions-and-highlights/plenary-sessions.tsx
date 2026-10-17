import Accordion from "@/components/common/Accordion";
import { Reveal } from "@/components/common/motion";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { makeMetaTitle, pageHead, type Route as SiteRoute } from "@/lib/routes";
import { PlenarySessions } from "@/lib/sessions";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/lang";

// Not listed in Routes (the page is hidden from navigation), so it carries its own head.
export const plenaryRoute: SiteRoute = {
  name: "plenary_sessions",
  path: "/sessions-and-highlights/plenary-sessions",
  meta: [{ title: makeMetaTitle("Plenary Sessions") }],
};

export const Route = createFileRoute(
  "/sessions-and-highlights/plenary-sessions",
)({
  component: RouteComponent,
  head: () => pageHead(plenaryRoute),
});

function RouteComponent() {
  const { t } = useT();
  return (
    <BasePageLayout name={t("sessions.plenary")} section={t("sessions.section")}>
      <div className="flex max-w-4xl flex-col gap-4">
        {PlenarySessions.map((s) => (
          <Reveal key={s.name}>
            <article className="panel hud-corners flex flex-col gap-5 p-6 sm:p-8">
              <h2 className="font-display text-lg leading-snug text-white sm:text-xl">{s.name}</h2>
              <div className="text-muted">
                <strong className="text-white">{t("sessions.moderator")}</strong>
                <br />
                {s.moderator.fullName}, {s.moderator.affiliation}
              </div>
              <Accordion
                items={[
                  {
                    content: (
                      <div className="grid gap-4 text-sm sm:grid-cols-2">
                        {s.participants.map((p) => (
                          <p key={p.fullName + p.affiliation}>
                            <span className="text-white">{p.fullName}</span>
                            <br />
                            {p.affiliation}
                          </p>
                        ))}
                      </div>
                    ),
                    title: t("sessions.participants"),
                  },
                ]}
              />
              <Accordion
                items={[
                  {
                    content: (
                      <div className="text-sm">
                        <p className="text-justify">{s.description}</p>
                      </div>
                    ),
                    title: t("sessions.description"),
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
