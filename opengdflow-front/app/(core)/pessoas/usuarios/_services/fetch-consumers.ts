import { fetcher } from "@/lib/fetcher";
import type { Consumer } from "@/lib/models/consumer";

export const fetchConsumers = async () => {
	try {
		const res = await fetcher<Consumer[]>("/consumidores");
		return res.data;
	} catch (error) {
		console.error("[fetchConsumers]:", error);
		return [];
	}
};
