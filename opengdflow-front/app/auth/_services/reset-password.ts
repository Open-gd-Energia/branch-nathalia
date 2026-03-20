import { fetcher } from "@/lib/fetcher";

export interface ResetPasswordRequestI {
	token: string;
	novaSenha: string;
}

export interface ResetPasswordResponseI {
	mensage: string;
}

export const resetPassword = async (
	data: ResetPasswordRequestI,
): Promise<ResetPasswordResponseI> => {
	const res = await fetcher<ResetPasswordResponseI>("/auth/reset-password", {
		body: data,
		method: "POST",
	});

	return res?.data;
};
