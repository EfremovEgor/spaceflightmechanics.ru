import axios from "axios";
import type { BaseAPIResponse } from "../types";

const apiInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/scitech2025`,
	timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});
export interface RegistrationRequest {
	full_name: string;
	email: string;
	country: string;
	organization: string;
	participation_format: string;
	is_presenter: boolean;
	full_name_ru?: string | undefined;
	confchair_paper_id?: string | undefined;
	paper_title?: string | undefined;
}
export interface RegistrationResponse extends RegistrationRequest {
	id: string;
	updated_at: string;
}
export const SciTech2025Service = {
	async register(data: RegistrationRequest) {
		const res = await apiInstance.post<
			BaseAPIResponse<RegistrationResponse>
		>(`/register`, data);
		return res.data.data;
	},
};
