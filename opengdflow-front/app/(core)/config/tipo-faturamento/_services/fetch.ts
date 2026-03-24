import { fetcher } from "@/lib/fetcher";
import type { BillingType } from "@/lib/models/billing-type";
import type { BillingTypeFilters } from "@/lib/redux/features/billing-type/slice";

export const fetchBillingType = async (
	name?: string,
	filters?: BillingTypeFilters,
): Promise<BillingType[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) queryParams.append(key, value);
			});
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<BillingType[]>(`/faturamentos-tipo${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchBillingType]:", error);
		return [];
	}
};
