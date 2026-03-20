import { fetcher } from "@/lib/fetcher";
import type { User } from "@/lib/models/user";

export const fetchUser = async (id: string) => {
	const res = await fetcher<User>(`/usuarios/${id}`);

	return res.data;
};
