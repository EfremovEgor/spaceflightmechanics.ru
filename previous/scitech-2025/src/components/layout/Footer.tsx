import { asset } from "@/lib/asset";
const Footer = () => {
	return (
		<div
			className="mt-auto h-32 w-full bg-cover bg-center"
			style={{ backgroundImage: `url(${asset("images/footer.jpg")})` }}
		></div>
	);
};

export default Footer;
