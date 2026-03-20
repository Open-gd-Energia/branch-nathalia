import { fetcher } from "@/lib/fetcher";
import type { EstatisticasGeracao } from "@/lib/models/estatisticas-geracao";

export const fetchEstatisticasGeracao = async (
	isUsina: string | number,
): Promise<EstatisticasGeracao | null> => {
	try {
		if (!isUsina) return null;
		const response = await fetcher<EstatisticasGeracao>(
			`/usinas/${isUsina}/estatisticasGeracao`,
			{
				method: "GET",
			},
		);

		return response.data;
	} catch (error) {
		console.error("[fetchUsinaEstatisticas]:", error);
		return null;
	}
};
