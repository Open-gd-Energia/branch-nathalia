import { fetcher } from "@/lib/fetcher";

export interface LoginRequestI {
	email: string;
	senha: string;
}

export interface LoginResponseI {
	accessToken: string;
	expiresIn: number; // number of seconds until the token expires
}

export const login = async (data: LoginRequestI): Promise<LoginResponseI> => {
	const res = await fetcher<LoginResponseI>("/auth/login", {
		body: data,
		method: "POST",
	});

	return res.data;
};
