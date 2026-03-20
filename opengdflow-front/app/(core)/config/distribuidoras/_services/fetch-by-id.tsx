import { fetcher } from "@/lib/fetcher";
import type { Distribuitors } from "@/lib/models/distribuidora";

export const fetchDistribuitorsById = async (
	id: string | number,
): Promise<Distribuitors | null> => {
	try {
		const response = await fetcher<Distribuitors>(`/distribuidoras/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchDistribuitorsById]:", error);
		return null;
	}
};
