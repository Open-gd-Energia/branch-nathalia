import { fetcher } from "@/lib/fetcher";
import type { Parametro } from "@/lib/models/parametro";

export const fetchParametros = async (
	parametro: string,
): Promise<Parametro | null> => {
	try {
		const res = await fetcher<Parametro>(`/parametros/${parametro}`);
		return res.data;
	} catch (error) {
		console.error("[fetchParametros]:", error);
		return null;
	}
};
