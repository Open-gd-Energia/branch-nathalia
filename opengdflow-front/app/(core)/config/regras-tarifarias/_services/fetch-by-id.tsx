import { fetcher } from "@/lib/fetcher";
import type { TariffRules } from "@/lib/models/tariff-rules";

export const fetchTariffRulesById = async (
	id: string | number,
): Promise<TariffRules | null> => {
	try {
		const response = await fetcher<TariffRules>(`/regraTarifaria/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchTariffRuleById]:", error);
		return null;
	}
};
