import { fetcher } from "@/lib/fetcher";
import type { BandeiraTarifaria } from "@/lib/models/bandeira-tarifaria";

export const fetchBandeirasTarifarias = async (): Promise<
	BandeiraTarifaria[]
> => {
	try {
		const res = await fetcher<BandeiraTarifaria[]>("/bandeiraTarifaria");
		return res.data;
	} catch (error) {
		console.error("[fetchBandeirasTarifarias]:", error);
		return [];
	}
};
