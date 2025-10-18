import Modal from "@/components/common/Modal";
import BasePageLayout from "@/components/layout/BasePageLayout";
import RegistrationForm from "@/components/RegistrationForm";
import { Routes } from "@/lib/routes";
import { Icon } from "@iconify/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/registration")({
	component: RouteComponent,
	head: () => ({
		meta: Routes.registration.meta,
	}),
});

function RouteComponent() {
	const [modalState, setModalState] = useState<
		null | "submission" | "success"
	>(null);
	return (
		<BasePageLayout name="Registration">
			<Modal
				name="Registration Form"
				onClose={() => setModalState(null)}
				open={modalState == "submission"}
			>
				<RegistrationForm onSuccess={() => setModalState("success")} />
			</Modal>
			<Modal
				name=""
				onClose={() => setModalState(null)}
				open={modalState == "success"}
			>
				<div className="min-w-[300px] md:min-w-[600px] lg:min-w-[800px] text-2xl flex flex-col justify-center items-center ">
					<Icon
						className="size-1/10 text-green-600"
						icon="line-md:circle-twotone-to-confirm-circle-transition"
					/>
					<p>
						You have successfully registered to the 6<sup>th</sup>{" "}
						SciTech Forum!
					</p>
				</div>
			</Modal>
			{/* <p className="paragraph">Be sure to register early and save!</p>
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
			</p> */}
			<button
				onClick={() => setModalState("submission")}
				className="button-promo uppercase mx-auto block w-fit my-16"
			>
				Register now
			</button>
			<p className="paragraph">
				If you require assistance during this process, or you have any
				other queries, please, contact Local Organizing Committee via{" "}
				<a className="link" href="mailto:orgcom@spacescitech.com.">
					orgcom@spacescitech.com
				</a>
			</p>
		</BasePageLayout>
	);
}
