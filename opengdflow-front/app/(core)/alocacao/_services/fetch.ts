import { fetcher } from "@/lib/fetcher";
import type { Alocacao } from "@/lib/models/alocacao";
import type { AlocacaoFilters } from "@/lib/redux/features/alocacao/slice";

export const fetchAlocacoes = async (
	name?: string,
	filters?: AlocacaoFilters,
): Promise<Alocacao[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) queryParams.append(key, value);
			});
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Alocacao[]>(`/alocacoes${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchAlocacoes]:", error);
		return [];
	}
};
