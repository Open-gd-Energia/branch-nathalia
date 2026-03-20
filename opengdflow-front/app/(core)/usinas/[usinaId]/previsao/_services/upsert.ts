import { fetcher } from "@/lib/fetcher";
import type { Previsao } from "@/lib/models/previsao";
import type { ZodPrevisaoFormData } from "../_components/zod-schema";

export const upsertPrevisao = async (
	data: ZodPrevisaoFormData,
): Promise<Previsao> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/previsao/${data.id}` : "/previsao";

		const res = await fetcher<Previsao>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertPrevisao]:", error);
		throw error;
	}
};
