import type { PropsWithChildren } from "react";

interface Props {
	name: string;
}
const BasePageLayout = ({ name, children }: PropsWithChildren<Props>) => {
	return (
		<div className="container px-2 mx-auto my-4">
			<h1 className="text-2xl font-bold text-primary">{name}</h1>
			{children}
		</div>
	);
};

export default BasePageLayout;
