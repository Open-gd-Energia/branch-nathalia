import { fetcher } from "@/lib/fetcher";
import type { Previsao } from "@/lib/models/previsao";

export const fetchPrevisaoById = async (
	id: string | number,
): Promise<Previsao | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<Previsao>(`/previsoes/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchPrevisaoById]:", error);
		return null;
	}
};
