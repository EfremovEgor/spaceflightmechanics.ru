interface Props {
	children: React.ReactNode;
	className?: string;
}

const Container = ({ children, className = "" }: Props) => {
	return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
};

export default Container;
