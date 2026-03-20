import { fetcher } from "@/lib/fetcher";
import type { Distribuitors } from "@/lib/models/distribuidora";

export interface UpsertDistribuitorsRequest extends Omit<Distribuitors, "id"> {
	id?: string;
}

export const upsertDistribuitors = async (
	data: UpsertDistribuitorsRequest,
): Promise<Distribuitors> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/distribuidoras/${data.id}` : "/distribuidoras";

		const res = await fetcher<Distribuitors>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertDistribuitors]:", error);
		throw error;
	}
};
