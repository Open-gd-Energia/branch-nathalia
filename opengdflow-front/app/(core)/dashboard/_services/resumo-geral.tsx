import { fetcher } from "@/lib/fetcher";
import type { DashboardResumoGeral } from "@/lib/models/dashboard";

export const fetchDashboardResumoGeral =
	async (): Promise<DashboardResumoGeral | null> => {
		try {
			const res = await fetcher<DashboardResumoGeral | null>(
				`/dashboard/resumoGeral`,
			);
			return res.data;
		} catch (error) {
			console.error("[fetchDashboardResumoGeral]:", error);
			return null;
		}
	};
