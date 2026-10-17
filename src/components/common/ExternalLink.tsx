import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
interface Props {
	to: string;
	text?: string;
	children?: ReactNode;
	className?: string;
}
const ExternalLink = ({ to, text, children, className = "" }: Props) => {
	return (
		<a className={`group inline-flex flex-row items-center gap-1 link ${className}`} href={to}>
			{text ?? children}
			<Icon
				className="inline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				icon="ri:external-link-fill"
			/>
		</a>
	);
};

export default ExternalLink;
