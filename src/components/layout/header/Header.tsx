import Nav from "./Nav";
import NavDropdown from "./NavDropdown";

const Header = () => {
	return (
		<header className="w-full">
			<div className="relative">
				<video
					className="absolute left-0 top-0 object-center w-full h-full object-cover -z-10"
					src="/videos/main.mp4"
					muted
					loop
					autoPlay
				>
					<source src="/videos/main.mp4"></source>
				</video>
				<div className="container px-2 mx-auto pt-12">
					<div className="flex flex-row justify-between">
						<div className="flex flex-col justify-around pb-4 gap-6 text-center mx-auto sm:mx-0 sm:text-left">
							<div className="flex flex-row gap-2 items-center align-middle justify-center sm:justify-start">
								<img
									className="w-[140px] sm:w-[220px] h-auto"
									src="/images/ras-logo.png"
									alt=""
								/>
								<img
									className="w-[120px] sm:w-[200px] h-auto"
									src="/images/rudn-logo.png"
									alt=""
								/>
							</div>
							<h1 className="text-white text-2xl font-bold">
								6<sup>th</sup> SciTech Forum <br /> on Space
								Engineering and Operations Support
							</h1>

							<p className=" text-white">
								December 2-4, 2025 <br /> RUDN University,
								Moscow, Russia
							</p>
						</div>
						<div className="hidden sm:block">
							<img
								className="w-[220px] h-full"
								src="/images/gagarin.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-primary">
				<Nav />
				<NavDropdown />
			</div>
		</header>
	);
};

export default Header;
