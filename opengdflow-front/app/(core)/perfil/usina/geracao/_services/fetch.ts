import { fetcher } from "@/lib/fetcher";
import type { Geracao } from "@/lib/models/geracao";
import type { GeracaoFilters } from "@/lib/redux/features/geracao/slice";

export const fetchGeracao = async (
	filters?: GeracaoFilters,
): Promise<Geracao[]> => {
	try {
		const queryParams = new URLSearchParams();

		for (const [key, value] of Object.entries(filters ?? {})) {
			if (value) queryParams.append(key, value);
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Geracao[]>(`/geracoes${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchGeracao]:", error);
		return [];
	}
};
