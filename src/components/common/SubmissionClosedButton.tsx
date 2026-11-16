import { Button } from "@/components/common/Button";
import { useT } from "@/lib/lang";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/** "Submit now" after the abstract deadline: looks inactive and explains why on click. */
export default function SubmissionClosedButton() {
	const { t } = useT();
	const [shown, setShown] = useState(false);
	return (
		<span className="relative inline-flex">
			<Button
				aria-disabled="true"
				icon={null}
				className="cursor-not-allowed opacity-50 grayscale"
				onClick={() => setShown(true)}
			>
				{t("common.submitNow")}
			</Button>
			<AnimatePresence>
				{shown && (
					<motion.span
						role="status"
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="absolute top-full left-0 mt-2 text-sm whitespace-nowrap text-flare"
					>
						{t("common.submissionClosed")}
					</motion.span>
				)}
			</AnimatePresence>
		</span>
	);
}
