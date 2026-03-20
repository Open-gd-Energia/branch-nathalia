import { fetcher } from "@/lib/fetcher";

export interface ForgotPasswordRequestI {
	email: string;
	urlResetPassword?: string;
}

export interface ForgotPasswordResponseI {
	mensage: string;
}

export const forgotPassword = async (
	data: ForgotPasswordRequestI,
): Promise<ForgotPasswordResponseI> => {
	const res = await fetcher<ForgotPasswordResponseI>("/auth/forgot-password", {
		body: data,
		method: "POST",
	});

	return res?.data;
};
