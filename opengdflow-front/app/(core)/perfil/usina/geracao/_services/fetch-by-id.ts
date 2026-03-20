import { fetcher } from "@/lib/fetcher";
import type { Geracao } from "@/lib/models/geracao";

export const fetchGeracaoById = async (
	id: string | number,
): Promise<Geracao | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<Geracao>(`/geracao/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchGeracaoById]:", error);
		return null;
	}
};
