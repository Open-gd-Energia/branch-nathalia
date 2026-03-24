import { fetcher } from "@/lib/fetcher";
import type { AccessProfile } from "@/lib/models/access-profiles";

export const fetchAccessProfiles = async (): Promise<AccessProfile[]> => {
	try {
		const res = await fetcher<AccessProfile[]>("/perfis");
		return res.data;
	} catch (error) {
		console.error("Error fetching access profiles:", error);
		return [];
	}
};
