import { fetcher } from "@/lib/fetcher";
import type { Cobranca, CobrancaRequest } from "@/lib/models/cobranca";

export const upsertCobranca = async (
	data: CobrancaRequest,
): Promise<Cobranca> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/titulos/${data.id}` : "/titulos";

		const res = await fetcher<Cobranca>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertCobranca]:", error);
		throw error;
	}
};
