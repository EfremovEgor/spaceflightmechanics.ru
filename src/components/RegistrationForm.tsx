import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getNames } from "country-list";
import { SciTech2025Service } from "@/api/services/scitech2025";

const RegistrationSchema = z
	.object({
		fullName: z.string().min(1, "This field could not be empty"),
		email: z.email("Invalid email address"),
		country: z.string().min(1, "Country is required"),
		organization: z.string().min(1, "This field could not be empty"),
		participationFormat: z
			.string()
			.min(1, "Participation format is required"),
		fullNameRU: z.string().optional(),
		isPresenter: z.boolean(),
		confChairPaperID: z.string().optional(),
		paperTitle: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.isPresenter) {
				return (
					data.confChairPaperID &&
					data.confChairPaperID.trim().length > 0 &&
					data.paperTitle &&
					data.paperTitle.trim().length > 0
				);
			}
			return true;
		},
		{
			message: "This field could not be empty",
			path: ["paperTitle"],
		}
	);

type RegistrationFormData = z.infer<typeof RegistrationSchema>;

export default function RegistrationForm({
	onSuccess = () => {},
}: {
	onSuccess?: () => void;
}) {
	const {
		register,
		handleSubmit,
		watch,

		formState: { errors, isSubmitting },
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(RegistrationSchema),
		defaultValues: {
			isPresenter: false,
		},
	});

	const isPresenter = watch("isPresenter");

	const onSubmit = async (data: RegistrationFormData) => {
		await SciTech2025Service.register({
			full_name: data.fullName,
			email: data.email,
			country: data.country,
			organization: data.organization,
			participation_format: data.participationFormat,
			is_presenter: data.isPresenter,
			confchair_paper_id: data.confChairPaperID,
			full_name_ru: data.fullNameRU,
			paper_title: data.paperTitle,
		});
		onSuccess();
	};

	return (
		<form
			className="form min-w-[300px] md:min-w-[600px] lg:min-w-[800px]"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form-field">
				<label className="form-label">Name and Surname*</label>
				<input className="form-input" {...register("fullName")} />
				{errors.fullName && (
					<span className="form-error">
						{errors.fullName.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label">Email*</label>
				<input
					className="form-input"
					type="email"
					{...register("email")}
				/>
				{errors.email && (
					<span className="form-error">{errors.email.message}</span>
				)}
			</div>
			<div className="form-field">
				<label className="form-label">Country*</label>
				<select className="form-input" {...register("country")}>
					<option value="">Select country</option>
					{getNames().map((c) => (
						<option value={c}>{c}</option>
					))}
				</select>
				{errors.country && (
					<span className="form-error">{errors.country.message}</span>
				)}
			</div>
			<div className="form-field">
				<label className="form-label">Organization*</label>
				<input className="form-input" {...register("organization")} />
				{errors.organization && (
					<span className="form-error">
						{errors.organization.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label">Participation Format*</label>
				<select
					className="form-input"
					{...register("participationFormat")}
				>
					<option value="">Select format</option>
					<option value="online">Online</option>
					<option value="offline">Offline</option>
				</select>
				{errors.participationFormat && (
					<span className="form-error">
						{errors.participationFormat.message}
					</span>
				)}
			</div>

			<div className="form-field">
				<label className="form-label">
					Full Name in Russian (if applicable)
				</label>
				<input className="form-input" {...register("fullNameRU")} />
			</div>

			<div className="form-field">
				<label className="form-label">
					<input
						className="form-checkbox"
						type="checkbox"
						{...register("isPresenter")}
					/>
					I'm going to present a paper at the Technical Session
				</label>
			</div>

			{isPresenter && (
				<>
					<div className="form-field">
						<label className="form-label">
							Paper ID (if already submitted)
						</label>
						<input
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
						<label className="form-label">Paper Title*</label>
						<input
							className="form-input"
							{...register("paperTitle")}
						/>
						{errors.paperTitle && (
							<span className="form-error">
								{errors.paperTitle.message}
							</span>
						)}
					</div>
				</>
			)}
			<div className="flex">
				<button
					type="submit"
					className="button-promo mx-auto"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Register"}
				</button>
			</div>
		</form>
	);
}
