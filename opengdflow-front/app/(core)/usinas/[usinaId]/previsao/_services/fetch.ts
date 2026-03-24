import { fetcher } from "@/lib/fetcher";
import type { Previsao } from "@/lib/models/previsao";
import type { PrevisaoFilters } from "@/lib/redux/features/previsao/slice";

export const fetchPrevisao = async (
	filters?: PrevisaoFilters,
): Promise<Previsao[]> => {
	try {
		const queryParams = new URLSearchParams();

		for (const [key, value] of Object.entries(filters ?? {})) {
			if (value) queryParams.append(key, value);
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Previsao[]>(`/previsoes${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchPrevisao]:", error);
		return [];
	}
};
