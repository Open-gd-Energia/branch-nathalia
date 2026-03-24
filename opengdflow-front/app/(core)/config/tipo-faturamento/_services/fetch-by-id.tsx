import { fetcher } from "@/lib/fetcher";
import type { BillingType } from "@/lib/models/billing-type";

export const fetchById = async (id: string): Promise<BillingType> => {
	try {
		const res = await fetcher<BillingType>(`/faturamentos-tipo/${id}`);
		return res.data;
	} catch (error) {
		console.error("[fetchById]:", error);
		throw error;
	}
};
