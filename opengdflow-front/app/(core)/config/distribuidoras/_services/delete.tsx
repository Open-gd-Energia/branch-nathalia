import { fetcher } from "@/lib/fetcher";

export const deleteDistribuitors = async (
	id: number | string,
): Promise<unknown> => {
	try {
		const response = await fetcher(`/distribuidoras/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteDistribuitors]:", error);
		throw error;
	}
};
