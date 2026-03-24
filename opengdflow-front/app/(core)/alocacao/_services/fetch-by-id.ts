import { fetcher } from "@/lib/fetcher";
import type { Alocacao } from "@/lib/models/alocacao";

export const fetchAlocacaoById = async (
	id: string | number,
): Promise<Alocacao | null> => {
	try {
		const response = await fetcher<Alocacao>(`/alocacoes/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchAlocacaoById]:", error);
		return null;
	}
};
