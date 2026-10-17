import { Icon } from "@iconify/react";
interface Props {
	path: string;
	text: string;
	className?: string;
}
const DownloadLink = ({ path, text, className }: Props) => {
	return (
		<a
			className={`inline-flex flex-row items-center link ${className}`}
			href={path}
			target="_blank"
		>
			{text}{" "}
			<Icon className="inline" icon="material-symbols:download-sharp" />
		</a>
	);
};

export default DownloadLink;
