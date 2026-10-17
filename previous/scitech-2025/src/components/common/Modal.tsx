import React from "react";
export interface Props extends React.PropsWithChildren {
	children: React.ReactElement;
	name: string;
	open?: boolean;
	onClose?: () => void;
	noCloseButton?: boolean;
}
const Modal = ({
	children,
	name,
	onClose = () => {},
	open = false,
	noCloseButton = false,
}: Props) => {
	return (
		open && (
			<div
				className="fixed w-full backdrop-blur top-0 bg-black/40 h-full left-0 flex content-center justify-center items-center"
				onClick={onClose}
			>
				<div
					className="bg-white rounded-xl"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="text-white flex rounded-t-xl flex-row justify-between items-center gap-8  bg-primary p-4">
						<h1 className="text-xl">{name}</h1>
						{noCloseButton && (
							<button onClick={onClose} className="text-xl">
								Close
							</button>
						)}
					</div>
					<div className="mt-4 px-4 pb-4">{children}</div>
				</div>
			</div>
		)
	);
};

export default Modal;
