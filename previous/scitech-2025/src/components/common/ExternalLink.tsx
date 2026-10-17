import { Icon } from "@iconify/react";
interface Props {
	to: string;
	text: string;
	className?: string;
}
const ExternalLink = ({ to, text, className }: Props) => {
	return (
		<a
			className={`inline-flex flex-row items-center link ${className}`}
			href={to}
		>
			{text} <Icon className="inline" icon="ri:external-link-fill" />
		</a>
	);
};

export default ExternalLink;
