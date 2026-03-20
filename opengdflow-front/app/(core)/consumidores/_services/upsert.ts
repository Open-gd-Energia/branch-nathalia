import { fetcher } from "@/lib/fetcher";
import type { Consumer } from "@/lib/models/consumer";
import type { ZodConsumerFormData } from "../_components/form-items/zod-schema";

export const upsertConsumer = async (
	data: ZodConsumerFormData,
): Promise<Consumer> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/consumidores/${data.id}` : "/consumidores";

		const res = await fetcher<Consumer>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertConsumer]:", error);
		throw error;
	}
};
