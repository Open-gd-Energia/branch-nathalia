import { fetcher } from "@/lib/fetcher";

export const deleteInternalUser = async (
	id: number | string,
): Promise<unknown> => {
	try {
		const response = await fetcher(`/usuarios/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteInternalUser]:", error);
		throw error;
	}
};
