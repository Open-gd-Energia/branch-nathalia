import { fetcher } from "@/lib/fetcher";
import type { Alocacao, AlocacaoRequest } from "@/lib/models/alocacao";

export const upsertAlocacao = async (
	data: AlocacaoRequest,
): Promise<Alocacao> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/alocacoes/${data.id}` : "/alocacoes";

		const res = await fetcher<Alocacao>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertAlocacao]:", error);
		throw error;
	}
};
