interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: Props) => {
  return (
    <div className={`max-w-[980px] px-4 mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
