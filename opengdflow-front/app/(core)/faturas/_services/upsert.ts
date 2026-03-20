import { fetcher } from "@/lib/fetcher";
import type { Invoice, InvoiceRequest } from "@/lib/models/invoices";

export const upsertInvoice = async (data: InvoiceRequest): Promise<Invoice> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/faturas/${data.id}` : "/faturas";

		const res = await fetcher<Invoice>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertInvoice]:", error);
		throw error;
	}
};
