import { fetcher } from "@/lib/fetcher";
import type { DiscountTypes } from "@/lib/models/discount-types";

export const fetchDiscountTypes = async (
	name?: string,
): Promise<DiscountTypes[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<DiscountTypes[]>(`/tipoDesconto${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchDiscountTypes]:", error);
		return [];
	}
};
