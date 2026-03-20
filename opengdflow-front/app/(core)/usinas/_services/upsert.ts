import { fetcher } from "@/lib/fetcher";
import type { Usina, UsinaRequest } from "@/lib/models/usina";

export const upsertUsina = async (data: UsinaRequest): Promise<Usina> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/usinas/${data.id}` : "/usinas";

		const res = await fetcher<Usina>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertUsina]:", error);
		throw error;
	}
};
