import { fetcher } from "@/lib/fetcher";
import type { Cobranca } from "@/lib/models/cobranca";
import type { CobrancasFilters } from "@/lib/redux/features/cobrancas/slice";

export const fetchCobranca = async (
	filters?: CobrancasFilters,
): Promise<Cobranca[]> => {
	try {
		const queryParams = new URLSearchParams();

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) queryParams.append(key, value);
			});
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Cobranca[]>(`/titulos${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchCobranca]:", error);
		return [];
	}
};
