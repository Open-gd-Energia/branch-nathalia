import { fetcher } from "@/lib/fetcher";
import type { TariffRules } from "@/lib/models/tariff-rules";

export const fetchTariffRules = async (
	name?: string,
): Promise<TariffRules[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<TariffRules[]>(`/regras-tarifarias${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchTariffRules]:", error);
		return [];
	}
};
