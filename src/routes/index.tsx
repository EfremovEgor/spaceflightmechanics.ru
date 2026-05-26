import ExternalLink from "@/components/common/ExternalLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { TechnicalSessions } from "@/lib/sessions";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: Routes.home.meta,
  }),
});

function App() {
  const { t } = useTranslation();

  return (
    <BasePageLayout name={t("home.About")}>
      <p>
        <strong>
          7<sup>th</sup> SciTech Forum on Space Engineering and Operations
          Support
        </strong>{" "}
        is taking place on November 24-26, 2026 in Moscow, Russia.{" "}
      </p>
      <p>
        The Forum is organized by <strong>Russian Academy of Sciences</strong>{" "}
        and <strong>RUDN University</strong>.
        <br />
        Phone: +79336677352, email:{" "}
        <a className="hover:underline" href="mailto:orgcom@spacescitech.com.">
          orgcom@spacescitech.com
        </a>{" "}
        (Local Organizing Committee).
      </p>

      <p>
        <strong>Partner in African region</strong>:{" "}
        <strong>Skylinks International Holdings Ltd</strong>, Nairobi, Kenya.{" "}
        <br /> Phone: +254717410544, +254721406821, email:{" "}
        <a
          className="hover:underline"
          href="mailto:catherine@skylinksinternational.co.ke"
        >
          catherine@skylinksinternational.co.ke
        </a>
        .
      </p>
      <p>
        <strong>Hybrid format (on-site and online)</strong> is supposed (the
        online format is supported for participants outside Moscow region). The
        participation in the Forum is free. Participants can attend the Forum
        with or without presentation at technical session. To participate with
        presentation it is necessary to go through the{" "}
        <Link className="link" to="/abstract-submission">
          Submission
        </Link>{" "}
        and{" "}
        <Link className="link" to="/registration">
          Registration
        </Link>{" "}
        processes. Participation without presentation requires only
        registration.
      </p>

      <p>
        <strong>Venue:</strong>{" "}
        <ExternalLink text="RUDN University" to="https://eng.rudn.ru/" />
        , 6 Miklukho-Maklaya Str., Moscow, 117198, Russia
        <br />
        <strong>Working languages</strong>: English and Russian (simultaneous
        translation).
      </p>

      <p>
        <strong>Abstract Submission Deadline:</strong> November 25, 2026
        (extended) <br />
        <strong>Presentation Submission deadline:</strong> November 30, 2026
        (extended) <br />
        <strong>Manuscript Submission deadline:</strong> January 20, 2027
      </p>
      <p>
        Papers for the Forum shall be selected basing on the quality of 500 word
        abstracts. For accepted papers presentations and complete manuscripts
        are to be submitted in accordance with the deadlines.
      </p>
      <p>
        Manuscripts will be published in the special volume of Advances in
        Mechanics and Control. The best papers will be recommended for
        publication in the special issue of{" "}
        <ExternalLink
          text=" Acta Astronautica"
          to="https://www.sciencedirect.com/journal/acta-astronautica"
        />
        .
      </p>
      <p>
        <strong>The following topics are supposed for presentations:</strong>
      </p>
			
      <ul className="list-disc list-inside ml-4">
        {TechnicalSessions.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>

      <p>
        The on-site participants of the Forum with presentations or highlight
        lectures are provided with full support of Local Organizing Committee,
        including lunch during the dates of the Forum, accommodation support, as
        well as professional and cultural tours (by invitation only). All the
        participants will receive warm welcome (coffee break, etc.).
      </p>
    </BasePageLayout>
  );
}
