import { fetcher } from "@/lib/fetcher";
import type { Geracao } from "@/lib/models/geracao";
import type { ZodGeracaoFormData } from "../_components/zod-schema";

export const upsertGeracao = async (
	data: ZodGeracaoFormData,
): Promise<Geracao> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/geracoes/${data.id}` : "/geracoes";

		const res = await fetcher<Geracao>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertGeracao]:", error);
		throw error;
	}
};
