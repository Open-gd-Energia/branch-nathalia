import { fetcher } from "@/lib/fetcher";
import type { TariffRules } from "@/lib/models/tariff-rules";

export interface UpsertTariffRulesRequest extends Omit<TariffRules, "id"> {
	id?: string;
}

export const upsertTariffRules = async (
	data: UpsertTariffRulesRequest,
): Promise<TariffRules> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/regraTarifaria/${data.id}` : "/regraTarifaria";

		const res = await fetcher<TariffRules>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertTariffRules]:", error);
		throw error;
	}
};
