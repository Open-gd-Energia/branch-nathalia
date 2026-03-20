import { fetcher } from "@/lib/fetcher";
import type { Usina } from "@/lib/models/usina";

export const fetchUsinaById = async (
	id: string | number,
): Promise<Usina | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<Usina>(`/usinas/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchUsinaById]:", error);
		return null;
	}
};
