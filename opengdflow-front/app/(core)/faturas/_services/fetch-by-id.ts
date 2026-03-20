import { fetcher } from "@/lib/fetcher";
import type { Invoice } from "@/lib/models/invoices";

export const fetchInvoiceById = async (
	id: string | number,
): Promise<Invoice | null> => {
	try {
		const response = await fetcher<Invoice>(`/faturas/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchInvoiceById]:", error);
		return null;
	}
};
