import { fetcher } from "@/lib/fetcher";
import type { AccessProfile } from "@/lib/models/access-profiles";

export interface UpsertAccessProfileRequest
	extends Omit<AccessProfile, "id" | "permissoes"> {
	id?: string;
	permissoes: { id: number }[];
}

export const upsertAccessProfile = async (
	data: UpsertAccessProfileRequest,
): Promise<AccessProfile> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/perfils/${data.id}` : "/perfils";

		const res = await fetcher<AccessProfile>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertAccessProfile]:", error);
		throw error;
	}
};
