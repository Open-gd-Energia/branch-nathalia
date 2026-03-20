import { fetcher } from "@/lib/fetcher";

export const deleteUsina = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/usinas/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteUsina]:", error);
		throw error;
	}
};
