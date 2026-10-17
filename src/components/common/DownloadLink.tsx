import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
interface Props {
	path: string;
	text?: string;
	children?: ReactNode;
	className?: string;
}
const DownloadLink = ({ path, text, children, className = "" }: Props) => {
	return (
		<a
			className={`group inline-flex flex-row items-center gap-1.5 link ${className}`}
			href={path}
			target="_blank"
		>
			{text ?? children}
			<Icon
				className="inline transition-transform duration-300 group-hover:translate-y-0.5"
				icon="material-symbols:download-sharp"
			/>
		</a>
	);
};

export default DownloadLink;
