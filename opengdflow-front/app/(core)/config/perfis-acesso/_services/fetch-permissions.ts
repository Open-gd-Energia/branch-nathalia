import { fetcher } from "@/lib/fetcher";
import type { Permission } from "@/lib/models/permission";

export const fetchPermissions = async (): Promise<Permission[]> => {
	try {
		const res = await fetcher<Permission[]>("/permissoes");
		return res.data;
	} catch (error) {
		console.error("Error fetching permissions:", error);
		return [];
	}
};
