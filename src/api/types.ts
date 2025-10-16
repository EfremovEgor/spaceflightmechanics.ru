export interface BaseAPIResponse<T> {
	data: T;
	message?: string;
	success: boolean;
}
