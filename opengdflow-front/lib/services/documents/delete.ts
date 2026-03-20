import { fetcher } from "@/lib/fetcher";

export const deleteDocument = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/documentos/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteDocument]:", error);
		throw error;
	}
};
