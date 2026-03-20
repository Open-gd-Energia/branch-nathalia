import { fetcher } from "@/lib/fetcher";

export const deleteInvoice = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/faturas/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteInvoice]:", error);
		throw error;
	}
};
