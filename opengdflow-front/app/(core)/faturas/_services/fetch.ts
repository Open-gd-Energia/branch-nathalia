import { fetcher } from "@/lib/fetcher";
import type { Invoice } from "@/lib/models/invoices";
import type { InvoicesFilters } from "@/lib/redux/features/invoices/slice";

export const fetchInvoices = async (
	name?: string,
	filters?: InvoicesFilters,
): Promise<Invoice[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nomeUsina", name);

		if (filters) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) queryParams.append(key, value);
			});
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Invoice[]>(`/faturas${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchInvoices]:", error);
		return [];
	}
};
