import { fetcher } from "@/lib/fetcher";
import type { Distribuitors } from "@/lib/models/distribuidora";

export const fetchDistribuitors = async (
	name?: string,
): Promise<Distribuitors[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Distribuitors[]>(
			`/distribuidoras${paramsString}`,
		);
		return res.data;
	} catch (error) {
		console.error("[fetchDistribuitors]:", error);
		return [];
	}
};
