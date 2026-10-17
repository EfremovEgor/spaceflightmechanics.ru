import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getData } from "country-list";
import type { TFunction } from "i18next";
import { useMemo } from "react";
import { useT } from "@/lib/lang";
import { isAxiosError } from "axios";
import { AnimatePresence, motion } from "motion/react";
import { SciTech2026Service } from "@/api/services/scitech2026";
import { Button } from "@/components/common/Button";

const makeSchema = (t: TFunction) =>
	z
		.object({
			fullName: z.string().min(1, t("form.errRequired")),
			email: z.email(t("form.errEmail")),
			country: z.string().min(1, t("form.errCountry")),
			organization: z.string().min(1, t("form.errRequired")),
			participationFormat: z.string().min(1, t("form.errFormat")),
			fullNameRU: z.string().optional(),
			isPresenter: z.boolean(),
			confChairPaperID: z.string().optional(),
			paperTitle: z.string().optional(),
		})
		.refine(
			(data) => {
				if (data.isPresenter) {
					return data.paperTitle && data.paperTitle.trim().length > 0;
				}
				return true;
			},
			{
				message: t("form.errRequired"),
				path: ["paperTitle"],
			},
		);

type RegistrationFormData = z.infer<ReturnType<typeof makeSchema>>;

/** English names are what the API stores; the label follows the page language. */
function useCountries(lang: string) {
	return useMemo(() => {
		const list = getData().map((c) => ({ value: c.name, label: c.name }));
		if (lang === "en" || typeof Intl.DisplayNames !== "function") return list.sort((a, b) => a.label.localeCompare(b.label));
		const names = new Intl.DisplayNames([lang], { type: "region" });
		return getData()
			.map((c) => ({ value: c.name, label: names.of(c.code) ?? c.name }))
			.sort((a, b) => a.label.localeCompare(b.label, lang));
	}, [lang]);
}

export default function RegistrationForm({
	onSuccess = () => {},
}: {
	onSuccess?: () => void;
}) {
	const { t, lang } = useT();
	const schema = useMemo(() => makeSchema(t), [t]);
	const countries = useCountries(lang);
	const {
		register,
		handleSubmit,
		watch,
		setError,

		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			isPresenter: false,
		},
	});

	const isPresenter = watch("isPresenter");

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			await SciTech2026Service.register({
				full_name: data.fullName,
				email: data.email,
				country: data.country,
				organization: data.organization,
				participation_format: data.participationFormat,
				is_presenter: data.isPresenter,
				// Paper fields stay in form state after unticking "presenter"; don't send them.
				confchair_paper_id: data.isPresenter
					? data.confChairPaperID
					: undefined,
				full_name_ru: data.fullNameRU,
				paper_title: data.isPresenter ? data.paperTitle : undefined,
				language: lang,
			});
		} catch (e) {
			setError("root", {
				message:
					isAxiosError(e) && e.response?.status == 409
						? t("form.errDuplicate")
						: isAxiosError(e) && e.response?.status == 403
							? t("form.errClosed")
							: t("form.errFailed"),
			});
			return;
		}
		onSuccess();
	};

	return (
		<form className="form w-full sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-field">
				<label className="form-label" htmlFor="reg-fullName">{t("form.fullName")}</label>
				<input id="reg-fullName" className="form-input" autoComplete="name" {...register("fullName")} />
				{errors.fullName && (
					<span className="form-error">
						{errors.fullName.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label" htmlFor="reg-email">{t("form.email")}</label>
				<input
					id="reg-email"
					className="form-input"
					type="email"
					autoComplete="email"
					{...register("email")}
				/>
				{errors.email && (
					<span className="form-error">{errors.email.message}</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label" htmlFor="reg-country">{t("form.country")}</label>
				<select id="reg-country" className="form-input" autoComplete="country-name" {...register("country")}>
					<option value="">{t("form.selectCountry")}</option>
					{countries.map((c) => (
						<option key={c.value} value={c.value}>
							{c.label}
						</option>
					))}
				</select>
				{errors.country && (
					<span className="form-error">{errors.country.message}</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label" htmlFor="reg-organization">{t("form.organization")}</label>
				<input id="reg-organization" className="form-input" autoComplete="organization" {...register("organization")} />
				{errors.organization && (
					<span className="form-error">
						{errors.organization.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label" htmlFor="reg-format">{t("form.format")}</label>
				<select
					id="reg-format"
					className="form-input"
					{...register("participationFormat")}
				>
					<option value="">{t("form.selectFormat")}</option>
					<option value="online">{t("form.online")}</option>
					<option value="offline">{t("form.offline")}</option>
				</select>
				{errors.participationFormat && (
					<span className="form-error">
						{errors.participationFormat.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label" htmlFor="reg-fullNameRU">
					{t("form.fullNameRU")}
				</label>
				<input id="reg-fullNameRU" className="form-input" {...register("fullNameRU")} />
			</div>

			<div className="form-field sm:col-span-2">
				<label className="form-label cursor-pointer rounded-xl border border-line bg-space-950/40 px-4 py-3.5 text-ink transition-colors hover:border-line-strong">
					<input
						className="form-checkbox"
						type="checkbox"
						{...register("isPresenter")}
					/>
					{t("form.presenter")}
				</label>
			</div>

			<AnimatePresence initial={false}>
				{isPresenter && (
					<motion.div
						className="grid gap-5 overflow-hidden sm:col-span-2 sm:grid-cols-2"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
					>
						<div className="form-field">
							<label className="form-label" htmlFor="reg-paperId">
								{t("form.paperId")}
							</label>
							<input
								id="reg-paperId"
								className="form-input"
								{...register("confChairPaperID")}
							/>
							{errors.confChairPaperID && (
								<span className="form-error">
									{errors.confChairPaperID.message}
								</span>
							)}
						</div>

						<div className="form-field">
							<label className="form-label" htmlFor="reg-paperTitle">{t("form.paperTitle")}</label>
							<input
								id="reg-paperTitle"
								className="form-input"
								{...register("paperTitle")}
							/>
							{errors.paperTitle && (
								<span className="form-error">
									{errors.paperTitle.message}
								</span>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{errors.root && (
				<p className="form-error rounded-xl border border-rose/30 bg-rose/10 px-4 py-3 text-center sm:col-span-2" role="alert">
					{errors.root.message}
				</p>
			)}
			<div className="flex justify-center pt-2 sm:col-span-2">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? t("form.submitting") : t("form.submit")}
				</Button>
			</div>
		</form>
	);
}
