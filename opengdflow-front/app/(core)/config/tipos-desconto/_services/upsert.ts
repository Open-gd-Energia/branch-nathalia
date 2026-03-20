import { fetcher } from "@/lib/fetcher";
import type { DiscountTypes } from "@/lib/models/discount-types";

export interface UpsertDiscountTypesRequest extends Omit<DiscountTypes, "id"> {
	id?: string;
}

export const upsertDiscountType = async (
	data: UpsertDiscountTypesRequest,
): Promise<DiscountTypes> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/tipoDesconto/${data.id}` : "/tipoDesconto";

		const res = await fetcher<DiscountTypes>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[DiscountTypes]:", error);
		throw error;
	}
};
