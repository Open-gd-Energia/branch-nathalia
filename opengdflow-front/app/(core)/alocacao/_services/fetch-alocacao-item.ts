import { fetcher } from "@/lib/fetcher";
import type { AlocacaoItem } from "@/lib/models/alocacao";
import type { AlocacaoItemFilters } from "@/lib/redux/features/alocacao/slice";

export const fetchAlocacaoItems = async (
	filters?: AlocacaoItemFilters,
): Promise<AlocacaoItem[]> => {
	try {
		const queryParams = new URLSearchParams();

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) queryParams.append(key, value?.toString());
			});
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<AlocacaoItem[]>(`/alocacaoItem${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchAlocacaoItems]:", error);
		return [];
	}
};
