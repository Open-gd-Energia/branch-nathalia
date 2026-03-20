import { fetcher } from "@/lib/fetcher";

export const deleteCobranca = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/titulos/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteCobranca]:", error);
		throw error;
	}
};
