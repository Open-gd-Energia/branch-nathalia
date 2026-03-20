import { fetcher } from "@/lib/fetcher";
import type { DashboardEnergiaGeradaConsumida } from "@/lib/models/dashboard";

export interface DashboardEnergiaGeradaConsumidaFilters {
	dataInicial: string;
	dataFinal: string;
}

export const fetchEnergiaGeradaVsConsumida = async ({
	dataInicial,
	dataFinal,
}: DashboardEnergiaGeradaConsumidaFilters): Promise<
	DashboardEnergiaGeradaConsumida[]
> => {
	try {
		const queryParams = new URLSearchParams({
			dataInicial,
			dataFinal,
		});
		const res = await fetcher<DashboardEnergiaGeradaConsumida[]>(
			`/dashboard/energiaGeradaVsConsumida?${queryParams.toString()}`,
		);
		return res.data;
	} catch (error) {
		console.error("[fetchEnergiaGeradaVsConsumida]:", error);
		return [];
	}
};
