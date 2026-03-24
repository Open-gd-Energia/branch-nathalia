import { fetcher } from "@/lib/fetcher";
import type { BillingType } from "@/lib/models/billing-type";

export interface UpsertBillingTypeResponse extends BillingType {}
export interface UpsertBillingTypeRequest extends Omit<BillingType, "id"> {
	id?: string;
}

export const upsertBillingType = async (
	data: UpsertBillingTypeRequest,
): Promise<UpsertBillingTypeResponse> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/faturamentos-tipo/${data.id}` : "/faturamentos-tipo";

		const res = await fetcher<UpsertBillingTypeResponse>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertBillingType]:", error);
		throw error;
	}
};
