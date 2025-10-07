import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
	component: RouteComponent,
	head: () => ({
		meta: Routes.contact.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Contact">
			<div className="grid md:grid-cols-2 gap-4 mt-4 ">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1125.5620053050418!2d37.499574!3d55.652052!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTXCsDM5JzA3LjciTiAzN8KwMjknNTguOSJF!5e0!3m2!1sen!2sru!4v1759307121673!5m2!1sen!2sru"
					allowFullScreen
					className="w-full h-full min-h-[40vh]"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
				<div>
					<p className="paragraph">
						<strong>Venue address:</strong> <br />
						6, Miklukho-Maklaya str.
						<br /> 117198, Moscow
						<br /> Russian Federation
					</p>

					<p className="paragraph">
						<strong>Local Organizing Committee:</strong>
						<br />
						Email: orgcom@spacescitech.com
					</p>
				</div>
			</div>
		</BasePageLayout>
	);
}
