import { fetcher } from "@/lib/fetcher";

export const deleteAlocacao = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/alocacao/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteAlocacao]:", error);
		throw error;
	}
};
