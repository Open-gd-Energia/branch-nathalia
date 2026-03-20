import { fetcher } from "@/lib/fetcher";
import type { Usina } from "@/lib/models/usina";
import type { UsinasFilters } from "@/lib/redux/features/usinas/slice";

export const fetchUsinas = async (
	name?: string,
	filters?: UsinasFilters,
): Promise<Usina[]> => {
	try {
		const queryParams = new URLSearchParams();
		if (name) queryParams.append("nome", name);

		for (const [key, value] of Object.entries(filters ?? {})) {
			if (value) queryParams.append(key, value);
		}

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<Usina[]>(`/usinas${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchUsinas]:", error);
		return [];
	}
};
