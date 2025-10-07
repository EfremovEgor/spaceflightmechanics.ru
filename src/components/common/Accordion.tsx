import { Icon } from "@iconify/react";
import { useState } from "react";

interface AccordionProps {
	items: { title: string; content: React.ReactNode }[];
}

const Accordion = ({ items }: AccordionProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="w-full space-y-2">
			{items.map((item, index) => {
				const isOpen = openIndex === index;
				return (
					<div key={index}>
						<button
							className="cursor-pointer w-full text-left flex justify-between items-center transition-colors"
							onClick={() => toggle(index)}
						>
							<span
								className={`font-bold transition-all border-b-2 hover:border-primary ${openIndex == index ? "border-primary" : "border-transparent"}`}
							>
								{item.title}
							</span>
							<Icon
								icon="mdi:chevron-down"
								className={`text-2xl transition-transform duration-300 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						<div
							className={`transition-[max-height] duration-300 overflow-hidden`}
							style={{ maxHeight: isOpen ? "1000px" : "0px" }}
						>
							<div className="mt-4">{item.content}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
