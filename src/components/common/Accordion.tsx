import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

interface AccordionProps {
	items: { title: string; content: React.ReactNode }[];
}

const Accordion = ({ items }: AccordionProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const id = useId();

	return (
		<div className="w-full divide-y divide-line overflow-hidden rounded-xl border border-line">
			{items.map((item, index) => {
				const isOpen = openIndex === index;
				return (
					<div key={item.title} className={`transition-colors ${isOpen ? "bg-white/[0.03]" : ""}`}>
						<button
							type="button"
							aria-expanded={isOpen}
							aria-controls={`${id}-${index}`}
							className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-semibold transition-colors hover:text-cyan"
							onClick={() => setOpenIndex(isOpen ? null : index)}
						>
							<span>{item.title}</span>
							<motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
								<Icon icon="mdi:chevron-down" className="text-2xl" />
							</motion.span>
						</button>
						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									id={`${id}-${index}`}
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
									className="overflow-hidden"
								>
									<div className="px-4 pb-4 text-muted">{item.content}</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
