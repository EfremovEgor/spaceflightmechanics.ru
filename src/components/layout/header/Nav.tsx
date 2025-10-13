import { Routes, type Route } from "@/lib/routes";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Dropdown from "./Dropdown";

const Nav = () => {
	const { t } = useTranslation();

	const resolveRoute = (route: Route) => {
		if (route.hidden || !route.showInNav) return;
		if (route.routes)
			return (
				<Dropdown title={t(`routes.${route.name}`)}>
					<div className="flex flex-col gap-1 px-2 py-4">
						{Object.values(route.routes).map((r) =>
							r.disabled ? (
								<p className="text-gray-400 text-nowrap">
									{t(`routes.${r.name}`)}
								</p>
							) : (
								<Link
									to={`${route.path}/${r.path}` as string}
									key={r.name}
									className="hover:underline [&.active]:underline [&.active]:link text-nowrap"
								>
									{t(`routes.${r.name}`)}
								</Link>
							)
						)}
					</div>
				</Dropdown>
			);
		return (
			<Link
				to={route.path}
				key={route.name}
				className="text-white/50 [&.active]:text-white/80 hover:text-white"
			>
				{t(`routes.${route.name}`)}
			</Link>
		);
	};
	return (
		<div className="container px-2 mx-auto text-lg py-6 justify-between hidden md:flex">
			{Object.values(Routes).map((v) => resolveRoute(v))}
		</div>
	);
};

export default Nav;
