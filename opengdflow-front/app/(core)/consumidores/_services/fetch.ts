import { fetcher } from "@/lib/fetcher";
import type { Consumer } from "@/lib/models/consumer";
import type { ConsumersFilters } from "@/lib/redux/features/consumers/slice";

export const fetchConsumers = async (
	name?: string,
	filters?: ConsumersFilters,
): Promise<Consumer[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		for (const [key, value] of Object.entries(filters ?? {})) {
			if (value) queryParams.append(key, value);
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Consumer[]>(`/consumidores${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchConsumers]:", error);
		return [];
	}
};
