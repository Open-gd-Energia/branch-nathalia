import { fetcher } from "@/lib/fetcher";
import type { Cobranca } from "@/lib/models/cobranca";

export const fetchCobrancaById = async (
	id: string | number,
): Promise<Cobranca | null> => {
	try {
		const response = await fetcher<Cobranca>(`/titulos/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchCobrancaById]:", error);
		return null;
	}
};
