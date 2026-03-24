import { fetcher } from "@/lib/fetcher";

export const deleteAccessProfile = async (
	id: number | string,
): Promise<unknown> => {
	try {
		const response = await fetcher(`/perfis/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteAccessProfile]:", error);
		throw error;
	}
};
