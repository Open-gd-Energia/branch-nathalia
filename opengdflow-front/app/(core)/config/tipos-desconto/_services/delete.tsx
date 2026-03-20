import { fetcher } from "@/lib/fetcher";

export const deleteDiscountTypes = async (
	id: number | string,
): Promise<unknown> => {
	try {
		const response = await fetcher(`/tipoDesconto/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteDistribuitors]:", error);
		throw error;
	}
};
