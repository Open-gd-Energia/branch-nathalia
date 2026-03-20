import { fetcher } from "@/lib/fetcher";
import type { User } from "@/lib/models/user";

export const fetchInternalUsers = async (name?: string): Promise<User[]> => {
	try {
		const queryParams = new URLSearchParams({ status: "1" });
		if (name) queryParams.append("nome", name);

		const paramsString = queryParams.size > 0 ? `?${queryParams}` : "";

		const res = await fetcher<User[]>(`/usuarios${paramsString}`);
		return res.data;
	} catch (error) {
		console.error("[fetchInternalUsers]:", error);
		return [];
	}
};
