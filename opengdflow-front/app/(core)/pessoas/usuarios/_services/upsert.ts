import { fetcher } from "@/lib/fetcher";
import type { User, UserRequest } from "@/lib/models/user";

export interface UpsertInternalUserRequest extends UserRequest {
	id?: number;
}

export const upsertInternalUser = async (
	data: UpsertInternalUserRequest,
): Promise<User> => {
	try {
		const verb = data?.id ? "PUT" : "POST";
		const route = data?.id ? `/usuarios/${data.id}` : "/usuarios";

		const res = await fetcher<User>(route, {
			method: verb,
			body: data,
		});
		return res.data;
	} catch (error) {
		console.error("[upsertInternalUser]:", error);
		throw error;
	}
};
