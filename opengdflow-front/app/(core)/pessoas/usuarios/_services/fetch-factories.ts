import { fetcher } from "@/lib/fetcher";
import type { Usina } from "@/lib/models/usina";

export const fetchFactories = async () => {
	try {
		const res = await fetcher<Usina[]>("/usinas");
		return res.data;
	} catch (error) {
		console.error("[fetchFactories]:", error);
		return [];
	}
};
