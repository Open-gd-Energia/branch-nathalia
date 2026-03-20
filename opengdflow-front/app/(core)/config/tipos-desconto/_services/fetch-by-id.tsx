import { fetcher } from "@/lib/fetcher";
import type { DiscountTypes } from "@/lib/models/discount-types";

export const fetchDiscountTypeById = async (
	id: string | number,
): Promise<DiscountTypes | null> => {
	try {
		const response = await fetcher<DiscountTypes>(`/tipoDesconto/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchDiscountTypesById]:", error);
		return null;
	}
};
