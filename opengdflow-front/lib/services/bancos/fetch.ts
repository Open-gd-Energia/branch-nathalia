import { fetcher } from "@/lib/fetcher";
import type { Banco } from "@/lib/models/usina";

export interface FetchBancosParams {
	nome?: string;
}

export const fetchBancos = async (
	params: FetchBancosParams,
): Promise<Banco[]> => {
	try {
		const queryParams = new URLSearchParams(params as Record<string, string>);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Banco[]>(`/bancos${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchBancos]:", error);
		return [];
	}
};
