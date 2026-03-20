import { fetcher } from "@/lib/fetcher";

export const deleteConsumer = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/consumidores/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteConsumer]:", error);
		throw error;
	}
};
