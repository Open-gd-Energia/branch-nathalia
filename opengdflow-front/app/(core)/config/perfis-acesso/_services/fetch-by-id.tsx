import { fetcher } from "@/lib/fetcher";
import type { AccessProfile } from "@/lib/models/access-profiles";

export const fetchAccessProfileById = async (
	id: string | number,
): Promise<AccessProfile | null> => {
	try {
		const response = await fetcher<AccessProfile>(`/perfis/${id}`);

		return response.data;
	} catch (error) {
		console.error("[fetchAccessProfilesById]:", error);
		return null;
	}
};
