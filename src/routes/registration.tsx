import DownloadLink from "@/components/common/DownloadLink";
import ExternalLink from "@/components/common/ExternalLink";
import BasePageLayout from "@/components/layout/BasePageLayout";
import { Routes } from "@/lib/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/registration")({
	component: RouteComponent,
	head: () => ({
		meta: Routes.registration.meta,
	}),
});

function RouteComponent() {
	return (
		<BasePageLayout name="Registration">
			<p className="paragraph">Be sure to register early and save!</p>
			<p className="paragraph">
				Registration payment is provided in Chinese Yuan (500 CNY), or
				Russian Ruble (5000 RUB). The payment could be done by bank
				transfer using the following bank details:{" "}
				<DownloadLink
					path="/files/cny_bank_details.docx"
					text="Chinese Yuan"
				/>
				,{" "}
				<DownloadLink
					path="/files/rub_bank_details.docx"
					text="Russian Ruble"
				/>
				.
			</p>
			<p className="paragraph">
				For payment in Russian Ruble, you can also use MIR bank card by
				the following{" "}
				<ExternalLink
					text="link"
					to="https://offers.rudn.ru/offer/MzIwMTI3MDAwMDAxMg=="
				/>
				, or press the Register Now button below.
			</p>
			<p className="paragraph">
				If you require assistance during this process, or you have any
				other queries, please, contact organization committee via{" "}
				<a className="link" href="mailto:orgcom@spacescitech.com.">
					orgcom@spacescitech.com
				</a>
			</p>
			<a
				className="button-promo uppercase mx-auto block w-fit mt-8"
				href="https://offers.rudn.ru/offer/MzIwMTI3MDAwMDAxMg=="
			>
				Register now
			</a>
		</BasePageLayout>
	);
}
