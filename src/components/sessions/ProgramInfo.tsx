import DownloadLink from "@/components/common/DownloadLink";
import { Reveal } from "@/components/common/motion";
import { PROGRAM_PDF, PROGRAM_PLACE } from "@/lib/program";
import { useT } from "@/lib/lang";

/** Place and time zone shown at the top of the program pages; the printed program link only on the program page. */
export default function ProgramInfo({ hidePlace = false, showPdf = false }: { hidePlace?: boolean; showPdf?: boolean }) {
  const { t } = useT();
  return (
    <Reveal>
      <p className="leading-relaxed text-muted">
        {!hidePlace && (
          <>
            <strong className="text-white">{t("sessions.place")}</strong> {PROGRAM_PLACE}
            <br />
          </>
        )}
        {t("sessions.timeZone")}
        {showPdf && (
          <>
            <br />
            <DownloadLink path={PROGRAM_PDF}>{t("sessions.downloadProgram")}</DownloadLink>
          </>
        )}
      </p>
    </Reveal>
  );
}
