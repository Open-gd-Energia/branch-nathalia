import { fetcher } from "@/lib/fetcher";

export const deleteTariffRules = async (
	id: number | string,
): Promise<unknown> => {
	try {
		const response = await fetcher(`/regras-tarifarias/${id}`, {
			method: "DELETE",
		});

		return response.data;
	} catch (error) {
		console.error("[deleteTariffRules]:", error);
		throw error;
	}
};
