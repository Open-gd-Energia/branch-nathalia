import { fetcher } from "@/lib/fetcher";
import type { Consumer } from "@/lib/models/consumer";

export const fetchConsumerById = async (
	id: string | number,
): Promise<Consumer | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<Consumer>(`/consumidores/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchConsumerById]:", error);
		return null;
	}
};
