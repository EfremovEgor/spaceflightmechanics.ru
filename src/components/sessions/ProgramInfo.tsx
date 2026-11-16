import ExternalLink from "@/components/common/ExternalLink";
import { Reveal } from "@/components/common/motion";
import { PROGRAM_PLACE, ZOOM_REGISTRATION } from "@/lib/program";
import { useT } from "@/lib/lang";

/** Place, Zoom link and time zone shown at the top of the program pages. */
export default function ProgramInfo({ breakoutRooms = false }: { breakoutRooms?: boolean }) {
  const { t } = useT();
  return (
    <Reveal>
      <p className="leading-relaxed text-muted">
        {!breakoutRooms && (
          <>
            <strong className="text-white">{t("sessions.place")}</strong> {PROGRAM_PLACE} ·{" "}
          </>
        )}
        <ExternalLink to={ZOOM_REGISTRATION}>{t("sessions.zoom")}</ExternalLink>
        {breakoutRooms && ` ${t("sessions.breakoutRooms")}`}
        <br />
        {t("sessions.timeZone")}
      </p>
    </Reveal>
  );
}
