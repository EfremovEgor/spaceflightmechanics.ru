import { Icon } from "@iconify/react";
import { useState, type PropsWithChildren } from "react";

interface Props {
	title: string;
}

const Dropdown = ({ title, children }: PropsWithChildren<Props>) => {
	const [open, setOpen] = useState(true);
	let timeoutId: ReturnType<typeof setTimeout>;

	const handleEnter = () => {
		clearTimeout(timeoutId);
		setOpen(true);
	};

	const handleLeave = () => {
		timeoutId = setTimeout(() => setOpen(false), 150);
	};
	return (
		<div
			className="relative"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
		>
			<button
				type="button"
				className="cursor-pointer text-white/50 hover:text-white inline-flex items-center transition-colors"
			>
				{title}
				<span className="ml-1 text-2xl transition-transform duration-200">
					<Icon
						icon="mdi:chevron-down"
						className={`transition ${open ? "rotate-180" : ""}`}
					/>
				</span>
			</button>

			<div
				className={`absolute left-1/2 -translate-x-1/2 top-13 shadow bg-white
                    w-fit transition-all duration-200 origin-top 
                    ${
						open
							? "opacity-100 scale-100"
							: "opacity-0 scale-95 pointer-events-none"
					}`}
			>
				{children}
			</div>
		</div>
	);
};

export default Dropdown;
