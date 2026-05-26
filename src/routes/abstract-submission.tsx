import DownloadLink from "@/components/common/DownloadLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/abstract-submission")({
  component: RouteComponent,
  head: () => ({
    meta: Routes.submission.meta,
  }),
});

function RouteComponent() {
  return (
    <BasePageLayout name="Submission">
      <p>
        All papers must be original and not simultaneously submitted to another
        journal or conference. Authors are responsible to obtain prior to
        submission any required government or company clearances of their
        papers.
      </p>
      <p>
        <strong>Abstracts</strong>,<strong>presentations</strong> and{" "}
        <strong>manuscripts</strong> are submitted in English.
      </p>
      <p>
        <strong>Presentations</strong> are prepared in .pptx format (16x9 aspect
        ratio).
      </p>
      <p>
        <strong>Manuscripts</strong> are prepared in .docx format, using the{" "}
        <DownloadLink
          path="/files/manuscript_template.docx"
          text="Manuscript template"
        />
      </p>
      <a
        href="https://submission.spacescitech.com/call_for_papers/scitech2026/submit?lang=en"
        target="_blank"
        className="button-promo uppercase mx-auto block w-fit my-8"
      >
        Submit now
      </a>
      <p>
        For the reports at the technical sessions English language is strictly
        recommended. Russian language with special translation in English could
        be used in rare cases for certain reports basing on personal
        coordination with Local Organizing Committee.
      </p>
      <p>
        The speeches at Opening Ceremony and Highlight Lectures are provided in
        English or Russian language with simultaneous translation (the
        presentations used are only in English).
      </p>
      <p>
        If you require assistance during the submission process, please contact
        us via{" "}
        <a className="link" href="mailto:orgcom@spacescitech.com.">
          orgcom@spacescitech.com
        </a>
        .
      </p>
    </BasePageLayout>
  );
}
