import { fetcher } from "@/lib/fetcher";
import type { User } from "@/lib/models/user";

export const fetchInternalUserById = async (
	id: string | number,
): Promise<User | null> => {
	try {
		const response = await fetcher<User>(`/usuarios/${id}`, {
			method: "GET",
		});

		return response.data;
	} catch (error) {
		console.error("[fetchInternalUserById]:", error);
		return null;
	}
};
