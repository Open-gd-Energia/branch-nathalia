import { fetcher } from "@/lib/fetcher";
import type { EstatisticasFatura } from "@/lib/models/estatisticas-fatura";

export const fetchConsumerEstatisticas = async (
	id: string | number,
): Promise<EstatisticasFatura | null> => {
	try {
		if (!id) return null;
		const response = await fetcher<EstatisticasFatura>(
			`/consumidores/${id}/estatisticasFatura`,
			{
				method: "GET",
			},
		);

		return response.data;
	} catch (error) {
		console.error("[fetchConsumerEstatisticas]:", error);
		return null;
	}
};
