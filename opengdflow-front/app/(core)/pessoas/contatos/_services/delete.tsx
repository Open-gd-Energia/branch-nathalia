import { fetcher } from "@/lib/fetcher";

export const deleteContact = async (id: number | string): Promise<unknown> => {
	try {
		const response = await fetcher(`/representantes/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteContact]:", error);
		throw error;
	}
};
